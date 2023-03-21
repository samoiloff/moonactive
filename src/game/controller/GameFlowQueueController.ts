import {GameControllerBase} from "./GameControllerBase";
import {FlowQueueCommand} from "../commands/FlowQueueCommand";
import {dGet} from "../../common/di/dGet";
import {WaitStartButtonClickCommand} from "../commands/WaitStartButtonClickCommand";
import {WaitCellPressedCommand} from "../commands/WaitCellPressedCommand";
import {MoveTileBackCommand} from "../commands/MoveTileBackCommand";
import {GameEvent} from "../constants/GameEvent";
import {MergeTilesCommand} from "../commands/MergeTilesCommand";

export class GameFlowQueueController extends GameControllerBase {

    protected queue: FlowQueueCommand;

    protected startTurnCommand: WaitCellPressedCommand;

    initialize() {
        this.queue = dGet(FlowQueueCommand);
        this.queue.add(dGet(WaitStartButtonClickCommand));
        this.startTurnCommand = dGet(WaitCellPressedCommand);
        this.queue.add(this.startTurnCommand);
        this.queue.add(dGet(MoveTileBackCommand));
        this.queue.add(dGet(MergeTilesCommand));

        this.queue.run();

        this.model.addListener(GameEvent.RESET_TURN, this.onResetTurn, this);
    }

    protected onResetTurn(): void {
        this.queue.reset();
        this.queue.runFromCommand(this.startTurnCommand)
    }


}
