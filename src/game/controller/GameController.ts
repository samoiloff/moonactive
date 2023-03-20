import {ControllersBase} from "../../common/mvc/ControllersBase";
import {dGet} from "../../common/di/dGet";
import {InitQueueCommand} from "../commands/InitQueueCommand";
import {GameView} from "../view/GameView";
import {GameModel} from "../model/GameModel";
import * as PIXI from "pixi.js";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameResizeController} from "./GameResizeController";

export class GameController extends ControllersBase {

    protected initQueue: InitQueueCommand = dGet(InitQueueCommand);

    protected model: GameModel;
    protected view: GameView;

    initialize() {
        super.initialize();

        this.initQueue.run().then(() => {
            this.onGameInitialized();
        });
    }

    protected onGameInitialized(): void {
        console.log("GameController.onGameInitialized()");
        this.view.background = new PIXI.Sprite();
        this.view.background.texture = ResourceUtils.getTexture('bg.jpg');
        this.view.container.addChild(this.view.background);


        this.addController(GameResizeController);
    }
}
