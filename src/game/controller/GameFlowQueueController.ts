import {GameControllerBase} from "./GameControllerBase";
import {FlowQueueCommand} from "../commands/FlowQueueCommand";
import {dGet} from "../../common/di/dGet";
import {GameEvent} from "../constants/GameEvent";
import {AnimUtil} from "../utils/AnimUtil";

export class GameFlowQueueController extends GameControllerBase {

    protected queue: FlowQueueCommand;

    initialize() {
        this.queue = dGet(FlowQueueCommand);
        this.queue.run();
        this.model.addListener(GameEvent.RESET_TURN, this.onResetTurn, this);
        this.model.addListener(GameEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.model.addListener(GameEvent.FLOW_RESET, this.onFlowReset, this);
    }

    protected onFlowReset(): void {
        this.model.dispatch(GameEvent.CELL_OVER_DEACTIVATED);
        this.queue.reset();
        AnimUtil.fadeOut(this.view.looseView.container);
        AnimUtil.fadeOut(this.view.shadowView.container);
        this.view.timerView.reset();
        this.view.fieldView.reset();
        this.queue.runFromCommand(this.queue.startTurnCommand);
    }

    protected onTimerComplete(): void {
        this.queue.reset();
        this.queue.runFromCommand(this.queue.looseViewCommand);
    }

    protected onResetTurn(): void {
        this.queue.reset();
        this.queue.runFromCommand(this.queue.startTurnCommand);
    }


}
