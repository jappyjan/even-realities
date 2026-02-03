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
  hasCreatedStartupContainer: boolean;
  eventListeners: EventListener[];
  renderRequests: Array<{
    page: EvenBetterPage;
    resolve: () => void;
    reject: (error: unknown) => void;
  }>;
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
      hasCreatedStartupContainer: false,
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
  private static get hasCreatedStartupContainer(): boolean {
    return EvenBetterSdk.state.hasCreatedStartupContainer;
  }
  private static set hasCreatedStartupContainer(value: boolean) {
    EvenBetterSdk.state.hasCreatedStartupContainer = value;
  }
  private static get eventListeners(): EventListener[] {
    return EvenBetterSdk.state.eventListeners;
  }
  private static get renderRequests(): Array<{
    page: EvenBetterPage;
    resolve: () => void;
    reject: (error: unknown) => void;
  }> {
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

      while (!bridge.ready) {
        await new Promise(resolve => setTimeout(resolve, 100));
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
    const promise = new Promise<void>((resolve, reject) => {
      EvenBetterSdk.renderRequests.push({ page, resolve, reject });
    });

    EvenBetterSdk.logger.debug(
      `[SDK] Render request queued for page "${page.id}" (queue size: ${EvenBetterSdk.renderRequests.length}).`,
    );

    EvenBetterSdk.processRenderRequests();

    return promise;
  }

  private static async processRenderRequests(): Promise<void> {
    if (EvenBetterSdk.renderInProgress) {
      return;
    }

    const request = EvenBetterSdk.renderRequests.shift();
    if (!request) {
      return;
    }

    EvenBetterSdk.renderInProgress = true;

    this.logger.debug(`[SDK] Processing render request for page "${request.page.id}".`);

    const { page, resolve, reject } = request;
    let renderError: unknown = null;
    try {
      EvenBetterSdk.logger.debug(`[SDK] Rendering page "${page.id}".`);
      await EvenBetterSdk.initialize();

      const pageElements = page.getElements();
      EvenBetterSdk.logger.debug(`[SDK] Page "${page.id}" has ${pageElements.length} elements.`);

      const changedElements = pageElements.filter((element) => element.didChange);
      const eventCaptureChanged = page.isEventCaptureDirty;
      const isSamePage = EvenBetterSdk.currentPageId === page.id;
      const hasStartupContainer = EvenBetterSdk.hasCreatedStartupContainer;

      EvenBetterSdk.logger.debug(
        `[SDK] Page "${page.id}" changed elements: ${changedElements.length}. Event capture changed: ${eventCaptureChanged}.`,
      );

      if (changedElements.length === 0 && !eventCaptureChanged && isSamePage && hasStartupContainer) {
        EvenBetterSdk.logger.debug(`[SDK] Page "${page.id}" has no changes. Skipping render.`);
        return;
      }

      const partialUpdateElements = changedElements.filter(
        (element): element is EvenBetterElementWithPartialUpdate =>
          element instanceof EvenBetterElementWithPartialUpdate && element.canPartialUpdate,
      );

      const requiresFullPageRender = !hasStartupContainer || !isSamePage || eventCaptureChanged
        || changedElements.some(
          (element) => !(element instanceof EvenBetterElementWithPartialUpdate)
            || !element.canPartialUpdate,
        );

      EvenBetterSdk.logger.debug(
        `[SDK] Page "${page.id}" requires full render: ${requiresFullPageRender} (Same page: ${isSamePage}).`,
      );

      if (requiresFullPageRender) {
        if (!hasStartupContainer) {
          EvenBetterSdk.logger.info(`[SDK] Creating startup page container for "${page.id}".`);
          const result = await EvenBetterSdk.bridge!.createStartUpPageContainer(page.toEvenSdkPage());
          const isCreateSuccess = result === 0 || result === true;
          if (!isCreateSuccess) {
            throw new Error(`Startup page container creation failed with code ${String(result)}.`);
          }
          EvenBetterSdk.hasCreatedStartupContainer = true;
        } else {
          EvenBetterSdk.logger.info(`[SDK] Rebuilding page container for "${page.id}".`);
          const success = await EvenBetterSdk.bridge!.rebuildPageContainer(
            RebuildPageContainer.fromJson(page.toEvenSdkPage()),
          );
          if (success === false) {
            throw new Error('Page container rebuild failed.');
          }
        }

        EvenBetterSdk.currentPageId = page.id;
        await Promise.all(pageElements.map((element) => element.afterRender()));
        page.clearEventCaptureDirty();
        EvenBetterSdk.logger.debug(`[SDK] Page "${page.id}" render complete with full rebuild.`);
        return;
      }

      for (const element of partialUpdateElements) {
        EvenBetterSdk.logger.debug(`[SDK] Updating element "${element.id}" with partial update.`);
        try {
          const result = await element.updateWithEvenHubSdk();
          EvenBetterSdk.logger.debug(`[SDK] Element "${element.id}" update result: ${result}.`);
          if (result === false) {
            EvenBetterSdk.logger.warn(
              `[SDK] Element "${element.id}" partial update returned false; keeping element dirty.`,
            );
          } else {
            await element.afterRender();
          }
        } catch (error) {
          EvenBetterSdk.logger.error(
            `[SDK] Element "${element.id}" partial update failed: ${String(error)}.`,
          );
          throw error;
        }
      }

      page.clearEventCaptureDirty();
      EvenBetterSdk.logger.debug(`[SDK] Page "${page.id}" render complete with partial updates.`);
    } catch (error) {
      renderError = error;
      EvenBetterSdk.logger.error(`[SDK] Render failed for page "${page.id}": ${String(error)}.`);
    } finally {
      if (renderError) {
        reject(renderError);
      } else {
        resolve();
      }

      setTimeout(() => {
        EvenBetterSdk.renderInProgress = false;
        EvenBetterSdk.processRenderRequests();
      }, 300);
    }
  }

  public addEventListener(listener: EventListener): void {
    EvenBetterSdk.logger.debug('[SDK] Adding Even hub event listener.');
    EvenBetterSdk.eventListeners.push(listener);
  }

  public removeEventListener(listener: EventListener): void {
    EvenBetterSdk.logger.debug('[SDK] Removing Even hub event listener.');
    const index = EvenBetterSdk.eventListeners.indexOf(listener);
    if (index < 0) {
      EvenBetterSdk.logger.warn('[SDK] Tried to remove unknown Even hub event listener.');
      return;
    }

    EvenBetterSdk.eventListeners.splice(index, 1);
  }
}