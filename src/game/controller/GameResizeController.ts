import {GameControllerBase} from "./GameControllerBase";
import {LayoutUtils} from "../utils/LayoutUtils";
import {GameEvent} from "../constants/GameEvent";
import {GameConstants} from "../constants/GameConstants";
import {OrientationType} from "../constants/OrientationType";
import {GameController} from "./GameController";

export class GameResizeController extends GameControllerBase {

    protected resizeTimeOut: any;

    initialize(): void {
        window.onresize = () => {
            this.clearResizeTimeOut();
            this.onResize();
        }

        this.resize();
    }

    protected clearResizeTimeOut(): void {
        if (this.resizeTimeOut >= 0) {
            clearTimeout(this.resizeTimeOut);
            this.resizeTimeOut = -1;
        }
    }

    protected onResize(): void {
        this.resizeTimeOut = setTimeout(() => {
            this.resize();
        }, 300);
    }

    protected resize(): void {
        this.view.app.renderer.resize(window.innerWidth, window.innerHeight);

        console.log(`onResize(window) : ${window.innerWidth}:${window.innerHeight}`);
        console.log(`onResize(app) : ${this.view.app.view.width}:${this.view.app.view.height}`);

        if (window.innerHeight > window.innerWidth) {
            this.model.width = GameConstants.layout.viewportPortrait.width;
            this.model.height = GameConstants.layout.viewportPortrait.height;
            this.model.setOrientation(OrientationType.PORTRAIT);
            LayoutUtils.fitRectIn(
                this.view.container,
                {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                GameConstants.layout.viewportPortrait
            )
        } else {
            this.model.width = GameConstants.layout.viewportLandscape.width;
            this.model.height = GameConstants.layout.viewportLandscape.height;
            this.model.setOrientation(OrientationType.LANDSCAPE);
            LayoutUtils.fitRectIn(
                this.view.container,
                {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                GameConstants.layout.viewportLandscape
            )
        }

        this.model.dispatch(GameEvent.RESIZE);
    }

}
