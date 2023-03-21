import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {gsap} from "gsap";
import {FieldUtil} from "../utils/FieldUtil";
import {FieldTileView} from "../view/FieldTileView";
import {FieldCellView} from "../view/FieldCellView";
import {FieldView} from "../view/FieldView";
import {CommandResolveBase} from "../../common/commands/CommandResolveBase";
import {AnimUtil} from "../utils/AnimUtil";
import {GameView} from "../view/GameView";

export class MoveTileBackCommand extends CommandResolveBase {

    protected gameModel: GameModel = dGet(GameModel);
    protected gameView: GameView = dGet(GameView);
    protected fieldView: FieldView = dGet(FieldView);

    protected internalRun() {
        const tile: FieldTileView = this.gameModel.tilePressed;
        const tileIndex: number = FieldUtil.positionToIndex(tile.x, tile.y);
        const cell: FieldCellView = this.fieldView.cells[tileIndex];
        gsap.killTweensOf(tile.container, "x,y");

        if (this.gameModel.tileMergeTo) {
            const index: number = FieldUtil.positionToIndex(this.gameModel.tileMergeTo.x, this.gameModel.tileMergeTo.y);
            const cell: FieldCellView = this.gameView.fieldView.cells[index];
            AnimUtil.setVisible(cell.tileWrong, false);
        }

        gsap.to(tile.container, {
            x: cell.getCenterX(),
            y: cell.getCenterY(),
            duration: .5,
            ease: 'power2.out',
            onComplete: () => {
                this.gameModel.tilePressed.container.filters = null;
                this.gameModel.tilePressed = null;
                this.internalResolve();
            }
        })
    }

    guard(): boolean {
        if (this.gameModel.tileMergeTo) {
            return this.gameModel.tileMergeTo.tileId !== this.gameModel.tilePressed.tileId;
        } else {
            return true;
        }
    }
}
