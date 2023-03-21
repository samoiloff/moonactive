import {CommandResolveBase} from "../../common/commands/CommandResolveBase";
import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {FieldView} from "../view/FieldView";
import {AnimUtil} from "../utils/AnimUtil";
import {GameEvent} from "../constants/GameEvent";
import {FieldUtil} from "../utils/FieldUtil";
import {FieldCellView} from "../view/FieldCellView";
import {GameView} from "../view/GameView";
import {FieldTileView} from "../view/FieldTileView";

export class MergeTilesCommand extends CommandResolveBase {

    protected gameModel: GameModel = dGet(GameModel);
    protected gameView: GameView = dGet(GameView);

    protected internalRun() {
        const index: number = FieldUtil.positionToIndex(this.gameModel.tileMergeTo.x, this.gameModel.tileMergeTo.y);
        const cell: FieldCellView = this.gameView.fieldView.cells[index];

        this.gameModel.tilePressed.merged = true;
        this.gameModel.tileMergeTo.merged = true;
        const tilePressed: FieldTileView = this.gameModel.tilePressed;

        const promises: Promise<any>[] = [];
        promises.push(AnimUtil.scaleTileDown(this.gameModel.tilePressed.container, cell));
        promises.push(AnimUtil.scaleTileDown(this.gameModel.tileMergeTo.container, cell));
        promises.push(AnimUtil.setVisible(cell.tileCorrect, false));

        Promise.all(promises).then(() => {
            tilePressed.container.filters = null;
        });
        this.gameModel.tilePressed = null;
        this.gameModel.tileMergeTo = null;
        this.internalResolve();
    }

    guard(): boolean {
        if (this.gameModel.tilePressed && this.gameModel.tileMergeTo) {
            return this.gameModel.tilePressed.tileId === this.gameModel.tileMergeTo.tileId;
        } else {
            return false;
        }
    }
}
