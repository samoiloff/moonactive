import {ModelBase} from "../../common/mvc/ModelBase";
import {FieldTileView} from "../view/FieldTileView";

export class GameModel extends ModelBase {

    width: number;
    height: number;

    tilePressed: FieldTileView;
    tileMergeTo: FieldTileView;




}
