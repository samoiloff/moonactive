import * as PIXI from "pixi.js";
import {GameConstants} from "../constants/GameConstants";
import {FieldCellView} from "./FieldCellView";
import {FieldTileView} from "./FieldTileView";
import {dGet} from "../../common/di/dGet";
import {FieldUtil} from "../utils/FieldUtil";

export class FieldView {

    container: PIXI.Container;

    cells: FieldCellView[] = [];

    tiles: FieldTileView[] = [];

    constructor() {

        this.container = new PIXI.Container();
        this.container.x = 87;
        this.container.y = 475;

        for (let y: number = 0; y < GameConstants.field.height; y++) {
            for (let x: number = 0; x < GameConstants.field.width; x++) {
                const cell: FieldCellView = dGet(FieldCellView);
                cell.x = x;
                cell.y = y;
                cell.container.x = 230 * x;
                cell.container.y = 230 * y;
                this.cells.push(cell);
                this.container.addChild(cell.container);
            }
        }

        this.fillTiles(FieldUtil.getRandomTileIds());

    }

    fillTiles(tilesIds: number[]): void {
        this.clearTiles();

        for (let y: number = 0; y < GameConstants.field.height; y++) {
            for (let x: number = 0; x < GameConstants.field.width; x++) {
                let index: number = this.tiles.length;
                const cell: FieldCellView = this.cells[index];

                const tile: FieldTileView = dGet(FieldTileView);
                tile.setTileId(tilesIds[index]);
                tile.x = x;
                tile.y = y;
                tile.container.x = cell.getCenterX();
                tile.container.y = cell.getCenterY();
                this.tiles.push(tile);
                this.container.addChild(tile.container);
            }
        }
    }

    clearTiles(): void {
        if (this.tiles.length > 0) {
            this.tiles.forEach((tile) => {
                this.container.removeChild(tile.container);
            });
            this.tiles = [];
        }
    }

}
