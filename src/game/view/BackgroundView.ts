import * as PIXI from "pixi.js";
import {ResourceUtils} from "../utils/ResourceUtils";
import {OrientatedViewBase} from "./OrientatedViewBase";
import {OrientationType} from "../constants/OrientationType";

export class BackgroundView extends OrientatedViewBase{

    container: PIXI.Sprite;

    protected initialize() {
        this.container = new PIXI.Sprite();
        this.container.texture = ResourceUtils.getTexture('bg.jpg');
        super.initialize();
    }

    onOrientationChanged() {
        if (this.gameModel.orientation === OrientationType.PORTRAIT) {
            this.container.x = this.container.y = 0;
            this.container.scale.x = this.container.scale.y = 1;
        } else {
            this.container.x = 0;
            this.container.y = -1280;
            this.container.scale.x = this.container.scale.y = 2;
        }
    }
}
