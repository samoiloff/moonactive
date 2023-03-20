import {ControllersBase} from "../../common/mvc/ControllersBase";
import {SingleRunCommandQueue} from "../../common/commands/SingleRunCommandQueue";
import {dGet} from "../../common/di/dGet";
import {InitQueueCommand} from "../commands/InitQueueCommand";

export class GameController extends ControllersBase {

    protected initQueue: InitQueueCommand = dGet(InitQueueCommand);

    initialize() {
        super.initialize();

        this.initQueue.run().then(() => {
            this.onGameInitialized();
        });
    }

    protected onGameInitialized(): void {

    }
}
