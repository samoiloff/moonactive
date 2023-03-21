import {CommandResolveBase} from "../../common/commands/CommandResolveBase";
import {GameEvent} from "../constants/GameEvent";
import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {FieldUtil} from "../utils/FieldUtil";

export class CheckLevelCompleteCommand extends CommandResolveBase {

    protected gameModel: GameModel = dGet(GameModel);

    protected internalRun() {
        const levelComplete: boolean = FieldUtil.getIsLevelComplete();
        if (levelComplete) {
            this.internalResolve();
        } else {
            this.gameModel.dispatch(GameEvent.RESET_TURN);
        }
    }
}
