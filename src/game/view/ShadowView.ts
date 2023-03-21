import * as PIXI from 'pixi.js';
import {GameConstants} from "../constants/GameConstants";
import {AnimUtil} from "../utils/AnimUtil";

export class ShadowView extends PIXI.Graphics {

    constructor() {
        super();
        this.beginFill(0x000000, 0.52);
        this.drawRect(0, 0, GameConstants.layout.viewport.width, GameConstants.layout.viewport.height);
        this.endFill();
        this.interactive = true;
    }

}
