import {ViewBase} from "../../common/mvc/ViewBase";
import * as PIXI from "pixi.js";
import {GameModel} from "../model/GameModel";
import {GameConstants} from "../GameConstants";

export class GameView extends ViewBase {
    app: PIXI.Application;
    container: PIXI.Container;

    background: PIXI.Graphics;

    constructor(model: GameModel) {
        super(model);

        this.app = new PIXI.Application({
            width: GameConstants.layout.viewport.width,
            height: GameConstants.layout.viewport.height,
            antialias: true,
            transparent: false,
            resolution: 1,
        });

        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        this.background = new PIXI.Graphics();
        this.background.beginFill()

    }

}
