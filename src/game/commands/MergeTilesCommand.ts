import {CommandResolveBase} from "../../common/commands/CommandResolveBase";
import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {FieldView} from "../view/FieldView";
import {AnimUtil} from "../utils/AnimUtil";
import {GameEvent} from "../constants/GameEvent";
import {FieldUtil} from "../utils/FieldUtil";
import {FieldCellView} from "../view/FieldCellView";
import {GameView} from "../view/GameView";

export class MergeTilesCommand extends CommandResolveBase {

    protected gameModel: GameModel = dGet(GameModel);
    protected gameView: GameView = dGet(GameView);

    protected internalRun() {
        const index: number = FieldUtil.positionToIndex(this.gameModel.tileMergeTo.x, this.gameModel.tileMergeTo.y);
        const cell: FieldCellView = this.gameView.fieldView.cells[index];

        const promises: Promise<any>[] = [];
        promises.push(AnimUtil.scaleDown(this.gameModel.tilePressed.container));
        promises.push(AnimUtil.scaleDown(this.gameModel.tileMergeTo.container));
        promises.push(AnimUtil.setVisible(cell.tileCorrect, false));

        Promise.all(promises).then(() => {
            this.gameModel.tilePressed.container.filters = null;
            this.gameModel.tilePressed = null;
            this.gameModel.dispatch(GameEvent.RESET_TURN);
        })
    }

    guard(): boolean {
        return this.gameModel.tilePressed.tileId === this.gameModel.tileMergeTo.tileId;
    }
}
