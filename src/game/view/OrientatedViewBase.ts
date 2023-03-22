import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {GameEvent} from "../constants/GameEvent";
import {OrientationType} from "../constants/OrientationType";

export abstract class OrientatedViewBase {

    protected gameModel: GameModel;

    constructor() {
        this.gameModel = dGet(GameModel);
        this.initialize();
    }

    protected initialize(): void {
        this.gameModel.addListener(GameEvent.ORIENTATION_CHANGED, this.onOrientationChanged, this);
        this.onOrientationChanged();
    }

    destroy(): void {
        this.gameModel.removeListener(GameEvent.ORIENTATION_CHANGED, this.onOrientationChanged, this);
    }

    onOrientationChanged(): void {
        if (this.gameModel.orientation === OrientationType.PORTRAIT) {
            this.portraitLayout();
        } else {
            this.landscapeLayout();
        }
    }

    portraitLayout(): void {

    };
    landscapeLayout(): void {

    };
}
