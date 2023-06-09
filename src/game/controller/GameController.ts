import {ControllersBase} from "../../common/mvc/ControllersBase";
import {dGet} from "../../common/di/dGet";
import {InitQueueCommand} from "../commands/InitQueueCommand";
import {GameView} from "../view/GameView";
import {GameModel} from "../model/GameModel";
import * as PIXI from "pixi.js";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameResizeController} from "./GameResizeController";
import {GameFlowQueueController} from "./GameFlowQueueController";
import {GameCellOverController} from "./GameCellOverController";

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

        this.view.init();

        this.addController(GameResizeController);
        this.addController(GameFlowQueueController);
        this.addController(GameCellOverController);
    }
}
