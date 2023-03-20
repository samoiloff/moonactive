import {LabelButton} from "./LabelButton";
import * as PIXI from "pixi.js";
import {IRectVO} from "../interfaces/IRectVO";

export class Slice9Button extends LabelButton {

    initialize() {
        this.container = new PIXI.Sprite();
        this.container.interactive = true;
        this.container.interactiveChildren = true;

        const planeSlice: IRectVO = this.getPlaneSlice();
        const texture: PIXI.Texture = this.getTexture();

        this.spriteBg = new PIXI.NineSlicePlane(texture, planeSlice.posX, planeSlice.posY, planeSlice.width, planeSlice.height);
        this.container.addChild(this.spriteBg);

        this.label = new PIXI.Text(this.getLabel(), this.getLabelStyle());
        this.container.addChild(this.label);
        this.alignLabel();

        this.container.addListener("pointerdown", this.onPointerDown, this);
    }

    getPlaneSlice(): IRectVO {
        return null;
    }

    setWidth(width: number): void {
        (this.spriteBg as PIXI.NineSlicePlane).width = width;
        this.alignLabel();
    }

    setHeight(height: number): void {
        (this.spriteBg as PIXI.NineSlicePlane).height = height;
        this.alignLabel();
    }

}
