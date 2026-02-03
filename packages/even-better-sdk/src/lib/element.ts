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

const areStringArraysEqual = (left: string[], right: string[]): boolean => {
    if (left.length !== right.length) {
        return false;
    }

    return left.every((value, index) => value === right[index]);
};

export class EvenBetterElementPosition {
    constructor(private positionX: number, private positionY: number) {
        return this;
    }

    public setX(x: number): EvenBetterElementPosition {
        if (this.positionX === x) {
            EvenBetterSdk.logger.debug(`[Element] Element position X unchanged (${x}).`);
            return this;
        }

        this.positionX = x;
        EvenBetterSdk.logger.debug(`[Element] Element position X set to ${x}.`);
        return this;
    }

    public setY(y: number): EvenBetterElementPosition {
        if (this.positionY === y) {
            EvenBetterSdk.logger.debug(`[Element] Element position Y unchanged (${y}).`);
            return this;
        }

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
        let nextWidth = width;
        if (nextWidth > EvenBetterElementSize.MAX_WIDTH) {
            nextWidth = EvenBetterElementSize.MAX_WIDTH;
            EvenBetterSdk.logger.warn(
                `[Element] Width is too large, clamped to ${EvenBetterElementSize.MAX_WIDTH}.`,
            );
        }

        if (this.sizeWidth === nextWidth) {
            EvenBetterSdk.logger.debug(`[Element] Element width unchanged (${nextWidth}).`);
            return this;
        }

        this.sizeWidth = nextWidth;
        EvenBetterSdk.logger.debug(`[Element] Element width set to ${nextWidth}.`);
        return this;
    }

    public setHeight(height: number): EvenBetterElementSize {
        let nextHeight = height;
        if (nextHeight > EvenBetterElementSize.MAX_HEIGHT) {
            nextHeight = EvenBetterElementSize.MAX_HEIGHT;
            EvenBetterSdk.logger.warn(
                `[Element] Height is too large, clamped to ${EvenBetterElementSize.MAX_HEIGHT}.`,
            );
        }

        if (this.sizeHeight === nextHeight) {
            EvenBetterSdk.logger.debug(`[Element] Element height unchanged (${nextHeight}).`);
            return this;
        }

        this.sizeHeight = nextHeight;
        EvenBetterSdk.logger.debug(`[Element] Element height set to ${nextHeight}.`);
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
    protected isDirty = true;

    public get didChange(): boolean {
        return this.isDirty;
    }

    protected markDirty(): void {
        this.isDirty = true;
    }

    protected markLayoutDirty(): void {
        this.markDirty();
    }

    public afterRender(): Promise<void> {
        this.isDirty = false;
        EvenBetterSdk.logger.debug(`[Element] Element "${this.containerID}" marked clean after render.`);
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
        const previousX = this.position.x;
        const previousY = this.position.y;
        setter(this.position);
        if (previousX === this.position.x && previousY === this.position.y) {
            EvenBetterSdk.logger.debug(`[Element] Element "${this.containerID}" position unchanged.`);
            return this;
        }

        this.markLayoutDirty();
        EvenBetterSdk.logger.debug(`[Element] Element "${this.containerID}" position updated.`);
        return this;
    }

    public setSize(setter: (size: EvenBetterElementSize) => void): EvenBetterElement {
        const previousWidth = this.size.width;
        const previousHeight = this.size.height;
        setter(this.size);
        if (previousWidth === this.size.width && previousHeight === this.size.height) {
            EvenBetterSdk.logger.debug(`[Element] Element "${this.containerID}" size unchanged.`);
            return this;
        }

        this.markLayoutDirty();
        EvenBetterSdk.logger.debug(`[Element] Element "${this.containerID}" size updated.`);
        return this;
    }
}

export abstract class EvenBetterElementWithPartialUpdate extends EvenBetterElement {
    public abstract get canPartialUpdate(): boolean;
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
        this.items = [...items];
        return this;
    }

    public override async afterRender(): Promise<void> {
        await super.afterRender();
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" rendered.`);
    }

    public addItem(item: string): EvenBetterListElement {
        this.items.push(item);
        this.markDirty();
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" added item.`);
        return this;
    }

    public removeItem(index: number): EvenBetterListElement {
        if (index < 0 || index >= this.items.length) {
            EvenBetterSdk.logger.warn(
                `[Element] List element "${this.id}" cannot remove item at invalid index ${index}.`,
            );
            return this;
        }

        this.items.splice(index, 1);
        this.markDirty();
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" removed item at ${index}.`);
        return this;
    }

    public setItems(items: string[]): EvenBetterListElement {
        if (areStringArraysEqual(this.items, items)) {
            EvenBetterSdk.logger.debug(
                `[Element] List element "${this.id}" items unchanged (${items.length} total).`,
            );
            return this;
        }

        this.items = [...items];
        this.markDirty();
        EvenBetterSdk.logger.debug(
            `[Element] List element "${this.id}" items set (${items.length} total).`,
        );
        return this;
    }

    public replaceItem(index: number, item: string): EvenBetterListElement {
        if (index < 0 || index >= this.items.length) {
            EvenBetterSdk.logger.warn(
                `[Element] List element "${this.id}" cannot replace item at invalid index ${index}.`,
            );
            return this;
        }

        if (this.items[index] === item) {
            EvenBetterSdk.logger.debug(
                `[Element] List element "${this.id}" item at ${index} unchanged.`,
            );
            return this;
        }

        this.items[index] = item;
        this.markDirty();
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
        const previousBorder = this.border
            ? { width: this.border.width, color: this.border.color, radius: this.border.radius }
            : { width: 0, color: '#000000', radius: 0 };

        if (this.border === null) {
            this.border = new Border(0, '#000000', 0);
        }

        setter(this.border);

        const currentBorder = {
            width: this.border.width,
            color: this.border.color,
            radius: this.border.radius,
        };

        if (
            previousBorder.width === currentBorder.width
            && previousBorder.color === currentBorder.color
            && previousBorder.radius === currentBorder.radius
        ) {
            EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" border unchanged.`);
            return this;
        }

        this.markDirty();
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" border updated.`);
        return this;
    }

    public setItemWidth(width: number): EvenBetterListElement {
        if (this.itemWidth === width) {
            EvenBetterSdk.logger.debug(
                `[Element] List element "${this.id}" item width unchanged (${width}).`,
            );
            return this;
        }

        this.itemWidth = width;
        this.markDirty();
        EvenBetterSdk.logger.debug(`[Element] List element "${this.id}" item width set to ${width}.`);
        return this;
    }

    public setIsItemSelectBorderEn(isItemSelectBorderEn: boolean): EvenBetterListElement {
        if (this.isItemSelectBorderEn === isItemSelectBorderEn) {
            EvenBetterSdk.logger.debug(
                `[Element] List element "${this.id}" item select border unchanged (${isItemSelectBorderEn}).`,
            );
            return this;
        }

        this.isItemSelectBorderEn = isItemSelectBorderEn;
        this.markDirty();
        EvenBetterSdk.logger.debug(
            `[Element] List element "${this.id}" item select border set to ${isItemSelectBorderEn}.`,
        );
        return this;
    }
}

export class EvenBetterTextElement extends EvenBetterElementWithPartialUpdate {
    private border: Border | null = null;
    private contentDirty = true;
    private layoutDirty = true;

    constructor(
        page: EvenBetterPage,
        private content: string
    ) {
        super(page, EvenBetterElementType.TEXT);
        return this;
    }

    public override async afterRender(): Promise<void> {
        await super.afterRender();
        this.contentDirty = false;
        this.layoutDirty = false;
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
        return this.contentDirty || this.layoutDirty;
    }

    public override get canPartialUpdate(): boolean {
        return this.contentDirty && !this.layoutDirty;
    }

    protected override markLayoutDirty(): void {
        this.layoutDirty = true;
    }

    private markContentDirty(): void {
        this.contentDirty = true;
    }

    public setBorder(setter: (border: Border) => void): EvenBetterTextElement {
        const previousBorder = this.border
            ? { width: this.border.width, color: this.border.color, radius: this.border.radius }
            : { width: 0, color: '#000000', radius: 0 };

        if (this.border === null) {
            this.border = new Border(0, '#000000', 0);
        }

        setter(this.border);

        const currentBorder = {
            width: this.border.width,
            color: this.border.color,
            radius: this.border.radius,
        };

        if (
            previousBorder.width === currentBorder.width
            && previousBorder.color === currentBorder.color
            && previousBorder.radius === currentBorder.radius
        ) {
            EvenBetterSdk.logger.debug(`[Element] Text element "${this.id}" border unchanged.`);
            return this;
        }

        this.markLayoutDirty();
        EvenBetterSdk.logger.debug(`[Element] Text element "${this.id}" border updated.`);
        return this;
    }

    public setContent(content: string): EvenBetterTextElement {
        if (this.content === content) {
            EvenBetterSdk.logger.debug(`[Element] Text element "${this.id}" content unchanged.`);
            return this;
        }

        this.content = content;
        this.markContentDirty();
        EvenBetterSdk.logger.debug(`[Element] Text element "${this.id}" content updated.`);
        return this;
    }

    public async updateWithEvenHubSdk(): Promise<boolean> {
        if (!this.canPartialUpdate) {
            EvenBetterSdk.logger.warn(
                `[Element] Text element "${this.id}" requires full render; partial update skipped.`,
            );
            return false;
        }

        EvenBetterSdk.logger.info(`[Element] Updating text element "${this.id}" via Even hub SDK.`);
        try {
            const bridge = await EvenBetterSdk.getRawBridge();
            const result = await bridge.textContainerUpgrade(TextContainerUpgrade.fromJson({
                containerID: this.id,
                containerName: this.id.toString(),
                content: this.content,
            }));
            this.contentDirty = false;
            EvenBetterSdk.logger.debug(`[Element] Text element "${this.id}" update result: ${result}.`);
            return result;
        } catch (error) {
            EvenBetterSdk.logger.error(`[Element] Text element "${this.id}" update failed.`);
            throw error;
        }
    }
}