import {ModelBase} from "../../common/mvc/ModelBase";
import {FieldTileView} from "../view/FieldTileView";
import {OrientationType} from "../constants/OrientationType";
import {GameEvent} from "../constants/GameEvent";

export class GameModel extends ModelBase {

    width: number;
    height: number;

    tilePressed: FieldTileView;
    tileMergeTo: FieldTileView;

    timerStarted: boolean;

    orientation: OrientationType = null;

    setOrientation(value: OrientationType): void {
        if (this.orientation !== value) {
            this.orientation = value;
            this.dispatch(GameEvent.ORIENTATION_CHANGED, value);
        }
    }

}
