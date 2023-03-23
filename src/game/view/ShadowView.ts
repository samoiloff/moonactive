import * as PIXI from 'pixi.js';
import {GameConstants} from "../constants/GameConstants";
import {OrientatedViewBase} from "./OrientatedViewBase";
import {OrientationType} from "../constants/OrientationType";
import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {GameEvent} from "../constants/GameEvent";
import {GameView} from "./GameView";

export class ShadowView  {

    container: PIXI.Graphics;

    protected gameModel: GameModel = dGet(GameModel);
    protected gameView: GameView = dGet(GameView);

    constructor() {
        this.initialize();
    }

    protected initialize() {
        this.container = new PIXI.Graphics();
        this.container.interactive = true;

        this.gameModel.addListener(GameEvent.RESIZE, this.onResize, this);
    }

    onResize() {
        const topLeft: PIXI.Point = this.container.toLocal({
            x: 0,
            y: 0
        });

        const bottomRight: PIXI.Point = this.container.toLocal({
            x: this.gameView.app.renderer.width,
            y: this.gameView.app.renderer.height
        })

        this.container.clear();
        this.container.beginFill(0x000000, 0.52);
        this.container.drawRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
        // if (this.gameModel.orientation === OrientationType.PORTRAIT) {
        //     this.container.drawRect(0, 0, GameConstants.layout.viewportPortrait.width, GameConstants.layout.viewportPortrait.height);
        // } else {
        //     this.container.drawRect(0, 0, GameConstants.layout.viewportLandscape.width, GameConstants.layout.viewportLandscape.height);
        // }
        this.container.endFill();
    }

}
