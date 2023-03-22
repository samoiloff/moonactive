import * as PIXI from 'pixi.js';
import {GameConstants} from "../constants/GameConstants";
import {OrientatedViewBase} from "./OrientatedViewBase";
import {OrientationType} from "../constants/OrientationType";

export class ShadowView extends OrientatedViewBase {

    container: PIXI.Graphics;

    protected initialize() {
        this.container = new PIXI.Graphics();
        this.container.interactive = true;

        super.initialize();
    }

    onOrientationChanged() {
        this.container.clear();
        this.container.beginFill(0x000000, 0.52);
        if (this.gameModel.orientation === OrientationType.PORTRAIT) {
            this.container.drawRect(0, 0, GameConstants.layout.viewportPortrait.width, GameConstants.layout.viewportPortrait.height);
        } else {
            this.container.drawRect(0, 0, GameConstants.layout.viewportLandscape.width, GameConstants.layout.viewportLandscape.height);
        }
        this.container.endFill();
    }

}
