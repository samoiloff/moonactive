import {CommandResolveBase} from "../../common/commands/CommandResolveBase";
import {AnimUtil} from "../utils/AnimUtil";
import {dGet} from "../../common/di/dGet";
import {GameView} from "../view/GameView";

export class ShowWinViewComand extends CommandResolveBase {

    protected gameView: GameView = dGet(GameView);

    protected internalRun() {

        AnimUtil.fadeIn(this.gameView.shadowView);

        this.gameView.timerView.pauseTimer();

        this.gameView.winView.show().then(() => {
            console.log(`Game Complete. Psd file have no "try again" button for this screen`)
        });
    }
}
