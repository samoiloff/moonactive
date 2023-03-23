import {GameControllerBase} from "./GameControllerBase";
import {GameEvent} from "../constants/GameEvent";
import {FieldCellView} from "../view/FieldCellView";
import {FieldUtil} from "../utils/FieldUtil";
import {AnimUtil} from "../utils/AnimUtil";
import {FieldTileView} from "../view/FieldTileView";
import * as PIXI from "pixi.js";

export class GameCellOverController extends GameControllerBase {

    protected point: PIXI.Point;

    initialize() {
        this.model.addListener(GameEvent.CELL_OVER_ACTIVATED, this.onCellOverActivated, this);
        this.model.addListener(GameEvent.CELL_OVER_DEACTIVATED, this.onCellOverDeactivated, this);
    }

    protected onCellOverActivated(): void {
        if (this.view.interactionManager.supportsTouchEvents) {
            this.view.container.on("touchmove", this.onPointerMove, this);
        } else {
            this.model.addListener(GameEvent.TILE_OVER, this.onTileOver, this);
            this.model.addListener(GameEvent.TILE_OUT, this.onTileOut, this);
        }
    }

    protected onCellOverDeactivated(): void {
        if (this.view.interactionManager.supportsTouchEvents) {
            this.view.container.off("touchmove", this.onPointerMove, this);
            if (this.point) {
                const target = this.view.interactionManager.hitTest(this.point, this.view.fieldView.container);
                if (target) {
                    const cell: FieldCellView = target['cell'];
                    console.log(cell.x + ":" + cell.y);
                    if (cell) {
                        this.onTileOver(cell);
                    }
                }
            }
        } else {
            this.model.removeListener(GameEvent.TILE_OVER, this.onTileOver, this);
            this.model.removeListener(GameEvent.TILE_OUT, this.onTileOut, this);
        }
    }

    protected onPointerMove(event): void {
        this.point = event.data.global;
        if (this.point) {
            const target = this.view.interactionManager.hitTest(this.point, this.view.fieldView.container);
            if (target) {
                const cell: FieldCellView = target['cell'];
                console.log(cell.x + ":" + cell.y);
                if (cell) {
                    this.onTileOver(cell);
                } else {
                    this.onTileOut();
                }
            } else {
                this.onTileOut();
            }
        }
    }

    protected onTileOver(cell: FieldCellView): void {
        if (this.model.tilePressed) {
            const index: number = FieldUtil.positionToIndex(cell.x, cell.y);
            const tile: FieldTileView = this.view.fieldView.tiles[index];
            if (tile !== this.model.tilePressed && !tile.merged && tile !== this.model.tileMergeTo) {
                if (this.model.tileMergeTo) {
                    this.onTileOut();
                }
                this.model.tileMergeTo = tile
                if (this.model.tileMergeTo !== this.model.tilePressed) {
                    if (this.model.tilePressed.tileId === this.model.tileMergeTo.tileId) {
                        AnimUtil.setVisible(cell.tileCorrect, true);
                    } else {
                        AnimUtil.setVisible(cell.tileWrong, true);
                    }
                }
            }
        }
    }

    protected onTileOut(): void {
        if (this.model.tilePressed && this.model.tileMergeTo) {
            if (this.model.tileMergeTo !== this.model.tilePressed) {
                const index: number = FieldUtil.positionToIndex(this.model.tileMergeTo.x, this.model.tileMergeTo.y);
                const cell: FieldCellView = this.view.fieldView.cells[index];
                if (this.model.tilePressed.tileId === this.model.tileMergeTo.tileId) {
                    AnimUtil.setVisible(cell.tileCorrect, false);
                } else {
                    AnimUtil.setVisible(cell.tileWrong, false);
                }
                this.model.tileMergeTo = null;
            }
        }
    }
}
