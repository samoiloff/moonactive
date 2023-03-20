import {ComponentBase} from "../common/mvc/ComponentBase";
import {GameModel} from "./model/GameModel";
import {GameView} from "./view/GameView";
import {GameController} from "./controller/GameController";

export class Game extends ComponentBase {

    constructor() {
        super(
            GameModel,
            GameView,
            GameController
        );
    }

}
