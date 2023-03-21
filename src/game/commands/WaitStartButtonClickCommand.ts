import {CommandResolveBase} from "../../common/commands/CommandResolveBase";
import {GameView} from "../view/GameView";
import {dGet} from "../../common/di/dGet";
import {GameEvent} from "../constants/GameEvent";
import {AnimUtil} from "../utils/AnimUtil";

export class WaitStartButtonClickCommand extends CommandResolveBase {

    protected gameView: GameView = dGet(GameView);

    protected internalRun() {
        this.gameView.startView.button.container.addListener(GameEvent.CLICK, this.onStartButtonClick, this);
    }

    protected onStartButtonClick(): void {

        this.gameView.startView.button.container.removeListener(GameEvent.CLICK, this.onStartButtonClick, this);
        AnimUtil.fadeOut(this.gameView.startView.container).then(() => {
            AnimUtil.fadeOut(this.gameView.shadowView).then(() => {
                this.internalResolve();
            })
        })
    }

    protected internalResolve() {
        this.gameView = null;
        super.internalResolve();
    }
}
