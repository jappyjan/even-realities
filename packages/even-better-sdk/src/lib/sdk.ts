import { EvenAppBridge, EvenHubEvent, RebuildPageContainer, waitForEvenAppBridge } from '@evenrealities/even_hub_sdk';
import { EvenBetterPage } from './page.js';
import { EvenBetterElementWithPartialUpdate } from './element.js';
import { EvenBetterLogger, EvenBetterLoggerImplementation, EvenBetterLogLevel } from './logger.js';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export type EventListener = (event: EvenHubEvent) => void;

type SharedSdkState = {
  bridge: EvenAppBridge | null;
  initializationPromise: Promise<void> | null;
  currentPageId: string | null;
  eventListeners: EventListener[];
  renderRequests: Array<{ page: EvenBetterPage; resolve: () => void }>;
  renderInProgress: boolean;
};

const getSharedState = (): SharedSdkState => {
  const globalScope = globalThis as typeof globalThis & {
    __evenBetterSdkSharedState?: SharedSdkState;
  };

  if (!globalScope.__evenBetterSdkSharedState) {
    globalScope.__evenBetterSdkSharedState = {
      bridge: null,
      initializationPromise: null,
      currentPageId: null,
      eventListeners: [],
      renderRequests: [],
      renderInProgress: false,
    };
  }

  return globalScope.__evenBetterSdkSharedState;
};

export class EvenBetterSdk {
  private readonly pages: Map<string, EvenBetterPage> = new Map();
  public static logger: EvenBetterLoggerImplementation = EvenBetterLogger;
  private static get state(): SharedSdkState {
    return getSharedState();
  }
  public static get bridge(): EvenAppBridge | null {
    return EvenBetterSdk.state.bridge;
  }
  private static set bridge(bridge: EvenAppBridge | null) {
    EvenBetterSdk.state.bridge = bridge;
  }
  private static get currentPageId(): string | null {
    return EvenBetterSdk.state.currentPageId;
  }
  private static set currentPageId(id: string | null) {
    EvenBetterSdk.state.currentPageId = id;
  }
  private static get eventListeners(): EventListener[] {
    return EvenBetterSdk.state.eventListeners;
  }
  private static get renderRequests(): Array<{ page: EvenBetterPage; resolve: () => void }> {
    return EvenBetterSdk.state.renderRequests;
  }
  private static get renderInProgress(): boolean {
    return EvenBetterSdk.state.renderInProgress;
  }
  private static set renderInProgress(value: boolean) {
    EvenBetterSdk.state.renderInProgress = value;
  }
  private static get initializationPromise(): Promise<void> | null {
    return EvenBetterSdk.state.initializationPromise;
  }
  private static set initializationPromise(promise: Promise<void> | null) {
    EvenBetterSdk.state.initializationPromise = promise;
  }
  public static setLogger(logger: EvenBetterLoggerImplementation): void {
    EvenBetterLogger.implementation = logger;
  }
  public static setLogLevel(level: EvenBetterLogLevel): void {
    EvenBetterLogger.level = level;
  }

  public createPage(identifier: string): EvenBetterPage {
    EvenBetterSdk.logger.info(`[SDK] Creating page for identifier "${identifier}".`);
    const page = new EvenBetterPage(this);
    this.pages.set(identifier, page);
    EvenBetterSdk.logger.debug(`[SDK] Page created with id "${page.id}" for identifier "${identifier}".`);
    return page;
  }

  public get isInitialized(): boolean {
    EvenBetterSdk.logger.debug(`[SDK] SDK initialized: ${EvenBetterSdk.bridge !== null}.`);
    return EvenBetterSdk.bridge !== null;
  }

  private static async initialize(): Promise<void> {
    if (EvenBetterSdk.initializationPromise) {
      EvenBetterSdk.logger.debug('[SDK] SDK already initializing, waiting for completion.');
      await EvenBetterSdk.initializationPromise;
    }

    if (EvenBetterSdk.bridge) {
      EvenBetterSdk.logger.debug('[SDK] SDK already initialized, skipping setup.');
      return;
    }

    let resolveInitialization: () => void = () => {
      throw new Error('Initialization promise called before it was set');
    };
    EvenBetterSdk.initializationPromise = new Promise((resolve) => {
      resolveInitialization = resolve;
    });

    try {
      EvenBetterSdk.logger.info('[SDK] Initializing EvenBetterSdk bridge.');
      const bridge = await waitForEvenAppBridge();
      EvenBetterSdk.logger.debug('[SDK] Even app bridge detected, waiting for readiness.');

      let waitCount = 0;
      while (!bridge.ready) {
        await new Promise(resolve => setTimeout(resolve, 100));
        waitCount += 1;
        if (waitCount % 10 === 0) {
          EvenBetterSdk.logger.info(`[SDK] Still waiting for bridge.ready (${waitCount * 100}ms elapsed).`);
        }
      }

      EvenBetterSdk.logger.info('[SDK] Even app bridge is ready.');
      bridge.onEvenHubEvent((event) => {
        EvenBetterSdk.logger.debug('[SDK] Even hub event received, dispatching to listeners.');
        this.eventListeners.forEach(listener => listener(event));
      });

      this.currentPageId = null;
      this.bridge = bridge;
      EvenBetterSdk.logger.info('[SDK] EvenBetterSdk bridge initialization complete.');
    } finally {
      resolveInitialization();
    }
  }

  public async getValue(key: string): Promise<string> {
    await EvenBetterSdk.initialize();

    return EvenBetterSdk.bridge!.getLocalStorage(key);
  }

  public async setValue(key: string, value: string): Promise<void> {
    await EvenBetterSdk.initialize();

    await EvenBetterSdk.bridge!.setLocalStorage(key, value);
  }

  public static async getRawBridge(): Promise<EvenAppBridge> {
    await EvenBetterSdk.initialize();

    return EvenBetterSdk.bridge!;
  }

  public async renderPage(page: EvenBetterPage): Promise<void> {
    EvenBetterSdk.logger.debug(`[SDK] adding render request for page "${page.id}".`);
    const promise = new Promise<void>((resolve) => {
      EvenBetterSdk.renderRequests.push({ page, resolve });
    });

    EvenBetterSdk.logger.debug(`[SDK] starting to process render requests.`);
    EvenBetterSdk.processRenderRequests();

    EvenBetterSdk.logger.debug(`[SDK] waiting for render request to complete.`);
    await promise;
    EvenBetterSdk.logger.debug(`[SDK] render request for page "${page.id}" completed.`);
  }

  private static async processRenderRequests(): Promise<void> {
    if (EvenBetterSdk.renderInProgress) {
      return;
    }

    EvenBetterSdk.renderInProgress = true;

    const request = EvenBetterSdk.renderRequests.shift();
    if (!request) {
      EvenBetterSdk.renderInProgress = false;
      return;
    }

    this.logger.debug(`[SDK] Processing render request for page "${request.page.id}".`);

    const { page, resolve } = request;
    try {
      EvenBetterSdk.logger.debug(`[SDK] Rendering page "${page.id}".`);
      await EvenBetterSdk.initialize();

      const pageElements = page.getElements();
      EvenBetterSdk.logger.debug(`[SDK] Page "${page.id}" has ${pageElements.length} elements.`);

      const partialUpdateElements = pageElements.filter((element) => {
        if (!element.didChange) {
          return false;
        }

        return element instanceof EvenBetterElementWithPartialUpdate;
      }) as EvenBetterElementWithPartialUpdate[];

      const changedElements = pageElements.filter((element) => element.didChange);
      const hasChangedElementWithoutPartialUpdate = changedElements.some(
        (element) => !(element instanceof EvenBetterElementWithPartialUpdate)
      );
      const isSamePage = EvenBetterSdk.currentPageId === page.id;
      const requiresFullPageRender = !isSamePage || hasChangedElementWithoutPartialUpdate;
      EvenBetterSdk.logger.debug(
        `[SDK] Page "${page.id}" requires full render: ${requiresFullPageRender} (Same page: ${isSamePage}).`,
      );

      if (requiresFullPageRender) {
        if (!isSamePage) {
          EvenBetterSdk.logger.info(`[SDK] Creating startup page container for "${page.id}".`);
          await EvenBetterSdk.bridge!.createStartUpPageContainer(page.toEvenSdkPage());
        } else {
          EvenBetterSdk.logger.info(`[SDK] Rebuilding page container for "${page.id}".`);
          await EvenBetterSdk.bridge!.rebuildPageContainer(RebuildPageContainer.fromJson(page.toEvenSdkPage()));
        }

        EvenBetterSdk.currentPageId = page.id;
        EvenBetterSdk.logger.debug(`[SDK] Page "${page.id}" render complete with full rebuild.`);
        return;
      }

      for (const element of partialUpdateElements) {
        EvenBetterSdk.logger.debug(`[SDK] Updating element "${element.id}" with partial update.`);
        try {
          const result = await element.updateWithEvenHubSdk();
          EvenBetterSdk.logger.debug(`[SDK] Element "${element.id}" update result: ${result}.`);
        } catch (error) {
          EvenBetterSdk.logger.error(`[SDK] Element "${element.id}" partial update failed.`);
          throw error;
        }
      }

      EvenBetterSdk.logger.debug(`[SDK] Page "${page.id}" render complete with partial updates.`);
    } finally {
      EvenBetterSdk.logger.debug(`[SDK] Resolving render request for page "${page.id}".`);
      resolve();
      EvenBetterSdk.renderInProgress = false;
      setTimeout(() => void EvenBetterSdk.processRenderRequests(), 0);
    }
  }

  public addEventListener(listener: EventListener): void {
    EvenBetterSdk.logger.debug('[SDK] Adding Even hub event listener.');
    EvenBetterSdk.eventListeners.push(listener);
  }

  public removeEventListener(listener: EventListener): void {
    EvenBetterSdk.logger.debug('[SDK] Removing Even hub event listener.');
    EvenBetterSdk.eventListeners.splice(EvenBetterSdk.eventListeners.indexOf(listener), 1);
  }
}