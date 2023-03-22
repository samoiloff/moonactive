import {CommandResolveBase} from "../../common/commands/CommandResolveBase";
import {AnimUtil} from "../utils/AnimUtil";
import {GameView} from "../view/GameView";
import {dGet} from "../../common/di/dGet";
import {GameEvent} from "../constants/GameEvent";
import {GameModel} from "../model/GameModel";

export class ShowLooseViewCommand extends CommandResolveBase {

    protected gameModel: GameModel = dGet(GameModel);
    protected gameView: GameView = dGet(GameView);

    protected internalRun() {
        AnimUtil.fadeIn(this.gameView.shadowView.container);
        this.gameView.looseView.show().then(() => {
            this.gameView.looseView.btn.container.addListener(GameEvent.CLICK, this.onBtnClick, this);
        });
    }

    protected onBtnClick(): void {
        this.gameModel.dispatch(GameEvent.FLOW_RESET);
    }
}
