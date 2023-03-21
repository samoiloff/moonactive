import {GameConstants} from "../constants/GameConstants";
import {TileId} from "../constants/TileId";
import {FieldCellView} from "../view/FieldCellView";
import {GameView} from "../view/GameView";
import {dGet} from "../../common/di/dGet";
import * as PIXI from "pixi.js";

export class FieldUtil {

    static indexToPosition(index: number): number[] {
        return [index % GameConstants.field.width, Math.floor(index / GameConstants.field.width)];
    }

    static positionToIndex(x: number, y: number): number {
        return y * GameConstants.field.width + x;
    }

    static getRandomTileIds(): number[] {
        const tileIds: number[] = [TileId.BLUE, TileId.GREEN, TileId.ORANGE, TileId.PINK, TileId.RED, TileId.YELLOW];
        const result: number[] = [];
        const totalTiles: number = GameConstants.field.width * GameConstants.field.height;

        while (result.length < totalTiles) {
            const colorIndex: number = Math.floor(Math.random() * tileIds.length);
            const tileId: number = tileIds.splice(colorIndex, 1)[0];
            for (let index: number = 0; index < 4; index++) { // take 3 tiles of random color
                if (result.length < totalTiles) {
                    result.push(tileId);
                } else {
                    break;
                }
            }
        }

        return result.sort((a, b) => (Math.random() - .5)); // random mix of result
    }

    static getCellPointerOver(pos: PIXI.Point): FieldCellView {
        const gameView: GameView = dGet(GameView);
        const interactionManager: PIXI.InteractionManager = gameView.app.renderer.plugins.interaction;
        const hitTest: any = interactionManager.hitTest(pos, gameView.fieldView.cells[0].container);
        console.log(interactionManager);

        return null;
    }

}
