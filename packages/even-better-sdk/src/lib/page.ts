import { EvenBetterSdk } from "./sdk.js";
import { EvenBetterElement, EvenBetterListElement, EvenBetterTextElement } from "./element.js";
import { CreateStartUpPageContainer, ListContainerProperty, TextContainerProperty } from "@evenrealities/even_hub_sdk";
import { nanoid } from "nanoid";

export class EvenBetterPage {
    public readonly id: string;
    private elements: Map<number, EvenBetterElement> = new Map();
    private eventCaptureElementId: number | null = null;
    private eventCaptureDirty = false;

    constructor(public readonly sdk: EvenBetterSdk) {
        this.id = nanoid();
        EvenBetterSdk.logger.info(`[Page] EvenBetterPage created with id "${this.id}".`);
        return this;
    }

    public async render(): Promise<void> {
        EvenBetterSdk.logger.info(`[Page] Rendering EvenBetterPage "${this.id}".`);
        return this.sdk.renderPage(this);
    }

    public toEvenSdkPage(): CreateStartUpPageContainer {
        const elements = Array.from(this.elements.values());
        EvenBetterSdk.logger.debug(
            `[Page] Building SDK page for "${this.id}" with ${elements.length} elements.`,
        );
        return CreateStartUpPageContainer.fromJson({
            containerTotalNum: this.elements.size,
            listObject: elements.filter(element => element.type === 'list').map(element => ({
                ...element.toEvenSdkElement(),
                isEventCapture: element.id === this.eventCaptureElementId ? 1 : 0,
            }) as ListContainerProperty),
            textObject: elements.filter(element => element.type === 'text').map(element => ({
                ...element.toEvenSdkElement(),
                isEventCapture: element.id === this.eventCaptureElementId ? 1 : 0,
            }) as TextContainerProperty),
        });
    }

    public getElements(): EvenBetterElement[] {
        EvenBetterSdk.logger.debug(`[Page] Getting elements for page "${this.id}".`);
        return Array.from(this.elements.values());
    }

    public setEventCaptureElement(element: EvenBetterElement): void {
        if (this.eventCaptureElementId === element.id) {
            EvenBetterSdk.logger.debug(
                `[Page] Event capture element "${element.id}" already set for page "${this.id}".`,
            );
            return;
        }

        EvenBetterSdk.logger.info(
            `[Page] Setting event capture element "${element.id}" for page "${this.id}".`,
        );
        this.eventCaptureElementId = element.id;
        this.eventCaptureDirty = true;
    }

    public get isEventCaptureDirty(): boolean {
        return this.eventCaptureDirty;
    }

    public clearEventCaptureDirty(): void {
        this.eventCaptureDirty = false;
    }

    public addTextElement(content: string): EvenBetterTextElement {
        EvenBetterSdk.logger.info(`[Page] Adding text element to page "${this.id}".`);
        const element = new EvenBetterTextElement(this, content);
        this.elements.set(element.id, element);
        EvenBetterSdk.logger.debug(
            `[Page] Text element "${element.id}" added to page "${this.id}".`,
        );
        return element;
    }

    public addListElement(items: string[]): EvenBetterListElement {
        EvenBetterSdk.logger.info(`[Page] Adding list element to page "${this.id}".`);
        const element = new EvenBetterListElement(this, items);
        this.elements.set(element.id, element);
        EvenBetterSdk.logger.debug(
            `[Page] List element "${element.id}" added to page "${this.id}".`,
        );
        return element;
    }
}