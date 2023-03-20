import {ViewBase} from "../../common/mvc/ViewBase";
import * as PIXI from "pixi.js";
import {GameModel} from "../model/GameModel";
import {GameConstants} from "../constants/GameConstants";
import {StartView} from "./StartView";

export class GameView extends ViewBase {
    app: PIXI.Application;
    container: PIXI.Container;

    background: PIXI.Sprite;
    startView: StartView;

    constructor(model: GameModel) {
        super(model);

        this.app = new PIXI.Application({
            width: GameConstants.layout.viewport.width,
            height: GameConstants.layout.viewport.height,
            antialias: true,
            transparent: false,
            resolution: 1,
            backgroundColor: 0xcfeffc
        });
        document.body.appendChild(this.app.view);

        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);
    }

    public init(): void {
        this.startView = new StartView();
        this.container.addChild(this.startView.container);
    }

}
