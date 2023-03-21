import {CommandResolveBase} from "../../common/commands/CommandResolveBase";
import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {GameEvent} from "../constants/GameEvent";
import {FieldCellView} from "../view/FieldCellView";
import {FieldUtil} from "../utils/FieldUtil";
import {FieldTileView} from "../view/FieldTileView";
import {GameView} from "../view/GameView";
import * as PIXI from "pixi.js";
import {IPointVO} from "../interfaces/IPointVO";
import {FieldView} from "../view/FieldView";
import {gsap, Elastic, Back, Quad, Power2} from "gsap";
import {DropShadowFilter} from "@pixi/filter-drop-shadow";


export class WaitCellPressedCommand extends CommandResolveBase {

    protected gameModel: GameModel;
    protected gameView: GameView;
    protected fieldView: FieldView;

    protected internalRun() {
        this.gameModel = dGet(GameModel);
        this.gameView = dGet(GameView);
        this.fieldView = dGet(FieldView);

        this.gameModel.addListener(GameEvent.TILE_PRESSED, this.onTilePressed, this);
    }

    protected onTilePressed(cell: FieldCellView, event: any): void {
        const cellIndex: number = FieldUtil.positionToIndex(cell.x, cell.y);
        const tile: FieldTileView = this.fieldView.tiles[cellIndex];
        this.fieldView.container.setChildIndex(tile.container, this.fieldView.container.children.length - 1);
        this.gameModel.tilePressed = tile;
        this.gameModel.dispatch(GameEvent.CELL_OVER_ACTIVATED);
        console.log("WaitCellPressedCommand.onTilePressed() " + cell.x + ":" + cell.y);

        this.gameView.container.on("pointermove", this.onPointerMove, this);
        this.gameModel.addListener(GameEvent.TILE_RELEASED, this.onTileReleased, this);

    }

    protected onPointerMove(event: PIXI.InteractionEvent): void {
        const pos: PIXI.Point = this.fieldView.container.toLocal(event.data.global);

        gsap.killTweensOf(this.gameModel.tilePressed.container, "x,y");
        gsap.to(this.gameModel.tilePressed.container, {
            x: pos.x,
            y: pos.y,
            duration: 1,
            ease: 'power1.out',
        })
        this.gameModel.tilePressed.container.x = pos.x;
        this.gameModel.tilePressed.container.y = pos.y;
        this.gameModel.tilePressed.container.filters = [new DropShadowFilter({
            offset: { x: 0, y: 0},
            blur: 2,
            alpha: .3
        })]
    }

    protected onTileReleased(tile: FieldCellView, event): void {
        this.gameModel.dispatch(GameEvent.CELL_OVER_DEACTIVATED);
        this.gameView.container.off("pointermove", this.onPointerMove, this);
        FieldUtil.getCellPointerOver(event.data.global);
        this.internalResolve();
    }

    protected internalResolve() {
        this.gameModel.removeListener(GameEvent.TILE_PRESSED, this.onTilePressed, this);
        this.gameModel.removeListener(GameEvent.TILE_RELEASED, this.onTileReleased, this);
        this.gameView.container.off("pointermove", this.onPointerMove, this);

        super.internalResolve();
    }
}
