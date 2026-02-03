import { ListContainerProperty, ListItemContainerProperty, TextContainerProperty, TextContainerUpgrade } from "@evenrealities/even_hub_sdk";
import { EvenBetterPage } from "./page.js";
import { EvenBetterSdk } from "./sdk.js";

export type BaseContainerProperty = {
    containerID?: number;
    containerName?: string;
    xPosition?: number;
    yPosition?: number;
    width?: number;
    height?: number;
};

export enum EvenBetterElementType {
    LIST = 'list',
    TEXT = 'text',
}

export class EvenBetterElementPosition {
    constructor(private positionX: number, private positionY: number) {
        return this;
    }

    public setX(x: number): EvenBetterElementPosition {
        this.positionX = x;
        EvenBetterSdk.logger.debug(`[Element] Element position X set to ${x}.`);
        return this;
    }

    public setY(y: number): EvenBetterElementPosition {
        this.positionY = y;
        EvenBetterSdk.logger.debug(`[Element] Element position Y set to ${y}.`);
        return this;
    }

    public get x(): number {
        return this.positionX;
    }

    public get y(): number {
        return this.positionY;
    }
}

export class EvenBetterElementSize {
    public static MAX_WIDTH = 576;
    public static MAX_HEIGHT = 238;

    constructor(private sizeWidth: number, private sizeHeight: number) {
        return this;
    }

    public setWidth(width: number): EvenBetterElementSize {
        if (width > EvenBetterElementSize.MAX_WIDTH) {
            width = EvenBetterElementSize.MAX_WIDTH;
            EvenBetterSdk.logger.warn(
                `[Element] Width is too large, clamped to ${EvenBetterElementSize.MAX_WIDTH}.`,
            );
        }

        this.sizeWidth = width;
        EvenBetterSdk.logger.debug(`[Element] Element width set to ${width}.`);
        return this;
    }

    public setHeight(height: number): EvenBetterElementSize {
        if (height > EvenBetterElementSize.MAX_HEIGHT) {
            height = EvenBetterElementSize.MAX_HEIGHT;
            EvenBetterSdk.logger.warn(
                `[Element] Height is too large, clamped to ${EvenBetterElementSize.MAX_HEIGHT}.`,
            );
        }

        this.sizeHeight = height;
        EvenBetterSdk.logger.debug(`[Element] Element height set to ${height}.`);
        return this;
    }

    public get width(): number {
        return this.sizeWidth;
    }

    public get height(): number {
        return this.sizeHeight;
    }
}

class Border {
    constructor(private borderWidth: number, private borderColor: string, private borderRadius: number) {
        return this;
    }

    public setWidth(width: number): Border {
        this.borderWidth = width;
        EvenBetterSdk.logger.debug(`[Element] Border width set to ${width}.`);
        return this;
    }

    public setColor(color: string): Border {
        this.borderColor = color;
        EvenBetterSdk.logger.debug(`[Element] Border color set to ${color}.`);
        return this;
    }

    public setRadius(radius: number): Border {
        this.borderRadius = radius;
        EvenBetterSdk.logger.debug(`[Element] Border radius set to ${radius}.`);
        return this;
    }

    public get width(): number {
        return this.borderWidth;
    }

    public get color(): string {
        return this.borderColor;
    }

    public get radius(): number {
        return this.borderRadius;
    }
}

export abstract class EvenBetterElement {
    private static elementIdCounter = 0;
    private readonly containerID = EvenBetterElement.elementIdCounter++;
    protected position: EvenBetterElementPosition = new EvenBetterElementPosition(0, 0);
    protected size: EvenBetterElementSize = new EvenBetterElementSize(100, 100);

    public abstract get didChange(): boolean;
    public afterRender(): Promise<void> {
        return Promise.resolve();
    }

    constructor(
        protected readonly page: EvenBetterPage,
        public readonly type: EvenBetterElementType,
    ) {
        EvenBetterSdk.logger.debug(
            `[Element] Element "${this.containerID}" created with type "${this.type}".`,
        );
        return this;
    }

    public get id(): number {
        return this.containerID;
    }

    public toEvenSdkElement(): BaseContainerProperty {
        EvenBetterSdk.logger.debug(`[Element] Serializing element "${this.containerID}".`);
        return {
            containerID: this.containerID,
            containerName: this.id.toString(),
            xPosition: this.position.x,
            yPosition: this.position.y,
            width: this.size.width,
            height: this.size.height,
        };
    }

    public markAsEventCaptureElement(): EvenBetterElement {
        EvenBetterSdk.logger.info(`[Element] Element "${this.containerID}" marked as event capture.`);
        this.page.setEventCaptureElement(this);

        return this;
    }

    public setPosition(setter: (position: EvenBetterElementPosition) => void): EvenBetterElement {
        setter(this.position);
        EvenBetterSdk.logger.debug(`[Element] Element "${this.containerID}" position updated.`);
        return this;
    }

    public setSize(setter: (size: EvenBetterElementSize) => void): EvenBetterElement {
        setter(this.size);
        EvenBetterSdk.logger.debug(`[Element] Element "${this.containerID}" size updated.`);
        return this;
    }
}

export abstract class EvenBetterElementWithPartialUpdate extends EvenBetterElement {
    public abstract updateWithEvenHubSdk(): Promise<boolean>;
}

export class EvenBetterListElement extends EvenBetterElement {
    private border: Border | null = null;
    private items: string[] = [];
    private itemWidth = 100;
    private isItemSelectBorderEn = false;

    constructor(
        page: EvenBetterPage,
        items: string[],
    ) {
        super(page, EvenBetterElementType.LIST);
        this.items = items;
        return this;
    }

    private isDirty = true;

    public override async afterRender(): Promise<void> {
        this.isDirty = false;
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" rendered.`);
    }

    public override get didChange(): boolean {
        return this.isDirty;
    }

    public addItem(item: string): EvenBetterListElement {
        this.items.push(item);
        this.isDirty = true;
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" added item.`);
        return this;
    }

    public removeItem(index: number): EvenBetterListElement {
        this.items.splice(index, 1);
        this.isDirty = true;
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" removed item at ${index}.`);
        return this;
    }

    public setItems(items: string[]): EvenBetterListElement {
        this.items = items;
        this.isDirty = true;
        EvenBetterSdk.logger.debug(
            `[Element] List element "${this.id}" items set (${items.length} total).`,
        );
        return this;
    }

    public replaceItem(index: number, item: string): EvenBetterListElement {
        this.items[index] = item;
        this.isDirty = true;
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" replaced item at ${index}.`);
        return this;
    }

    public override toEvenSdkElement(): ListContainerProperty {
        EvenBetterSdk.logger.debug(`[Element] Serializing list element "${this.id}".`);
        return ListContainerProperty.fromJson({
            ...super.toEvenSdkElement(),
            borderWidth: this.border?.width,
            borderColor: this.border?.color,
            borderRdaius: this.border?.radius,
            itemContainer: ListItemContainerProperty.fromJson({
                itemCount: this.items.length,
                itemWidth: this.itemWidth,
                isItemSelectBorderEn: this.isItemSelectBorderEn ? 1 : 0,
                itemName: this.items,
            }),
        });
    }

    public setBorder(setter: (border: Border) => void): EvenBetterListElement {
        if (this.border === null) {
            this.border = new Border(0, '#000000', 0);
        }

        setter(this.border);
        this.isDirty = true;
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" border updated.`);
        return this;
    }

    public setItemWidth(width: number): EvenBetterListElement {
        this.itemWidth = width;
        this.isDirty = true;
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" item width set to ${width}.`);
        return this;
    }

    public setIsItemSelectBorderEn(isItemSelectBorderEn: boolean): EvenBetterListElement {
        this.isItemSelectBorderEn = isItemSelectBorderEn;
        this.isDirty = true;
        EvenBetterSdk.logger.debug(
            `[Element] List element "${this.id}" item select border set to ${isItemSelectBorderEn}.`,
        );
        return this;
    }
}

export class EvenBetterTextElement extends EvenBetterElementWithPartialUpdate {
    private border: Border | null = null;
    private isDirty = true;

    constructor(
        page: EvenBetterPage,
        private content: string
    ) {
        super(page, EvenBetterElementType.TEXT);
        return this;
    }

    public override async afterRender(): Promise<void> {
        this.isDirty = false;
        EvenBetterSdk.logger.debug(`[Element] Text element "${this.id}" rendered.`);
    }

    public override toEvenSdkElement(): TextContainerProperty {
        EvenBetterSdk.logger.debug(`[Element] Serializing text element "${this.id}".`);
        return TextContainerProperty.fromJson({
            ...super.toEvenSdkElement(),
            borderWidth: this.border?.width,
            borderColor: this.border?.color,
            borderRdaius: this.border?.radius,
            content: this.content,
        });
    }

    public override get didChange(): boolean {
        return this.isDirty;
    }

    public setBorder(setter: (border: Border) => void): EvenBetterTextElement {
        if (this.border === null) {
            this.border = new Border(0, '#000000', 0);
        }

        setter(this.border);
        this.isDirty = true;
        EvenBetterSdk.logger.debug(`[Element] Text element "${this.id}" border updated.`);
        return this;
    }

    public setContent(content: string): EvenBetterTextElement {
        this.content = content;
        this.isDirty = true;
        EvenBetterSdk.logger.debug(`[Element] Text element "${this.id}" content updated.`);
        return this;
    }

    public async updateWithEvenHubSdk(): Promise<boolean> {
        EvenBetterSdk.logger.info(`[Element] Updating text element "${this.id}" via Even hub SDK.`);
        try {
            const bridge = await EvenBetterSdk.getRawBridge();
            const result = await bridge.textContainerUpgrade(TextContainerUpgrade.fromJson({
                containerID: this.id,
                containerName: this.id.toString(),
                content: this.content,
            }));
            this.isDirty = false;
            EvenBetterSdk.logger.debug(`[Element] Text element "${this.id}" update result: ${result}.`);
            return result;
        } catch (error) {
            EvenBetterSdk.logger.error(`[Element] Text element "${this.id}" update failed.`);
            throw error;
        }
    }
}