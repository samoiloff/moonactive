import * as PIXI from "pixi.js";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameConstants} from "../constants/GameConstants";
import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {GameEvent} from "../constants/GameEvent";

export class FieldCellView {

    x: number;
    y: number;

    container: PIXI.Container;
    bg: PIXI.Sprite;

    hitMc: PIXI.Graphics;

    protected model: GameModel = dGet(GameModel);

    constructor() {
        this.container = new PIXI.Container();

        this.bg = new PIXI.Sprite(ResourceUtils.getTexture(GameConstants.textures.tileBG));
        this.container.addChild(this.bg);

        this.hitMc = new PIXI.Graphics();
        this.hitMc.beginFill(0x00ff00, 1);
        this.hitMc.drawRect(0, 0, this.bg.texture.width, this.bg.texture.height);
        this.hitMc.cursor = "pointer";
        this.hitMc.alpha = 0;
        this.container.addChild(this.hitMc);
        this.hitMc.interactive = true;

        this.hitMc.on("pointerdown", this.onCellDown, this);
        this.hitMc.on("pointerup", this.onCellUp, this);
        this.hitMc.on("pointerupoutside", this.onCellUp, this);
    }

    public setEnabled(value: boolean): void {
        this.hitMc.interactive = value;
    }

    onCellDown(event): void {
        this.model.emit(GameEvent.TILE_PRESSED, this, event);
        event.stopPropagation();
    }

    onCellUp(event): void {
        this.model.emit(GameEvent.TILE_RELEASED, this, event);
        event.stopPropagation();
    }

    getCenterX(): number {
        return this.container.x + this.bg.texture.width / 2;
    }

    getCenterY(): number {
        return this.container.y + this.bg.texture.height / 2;
    }
}
