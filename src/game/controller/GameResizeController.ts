import {GameControllerBase} from "./GameControllerBase";
import {LayoutUtils} from "../utils/LayoutUtils";
import {GameEvent} from "../constants/GameEvent";
import {GameConstants} from "../constants/GameConstants";

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

        this.model.width = window.innerWidth;
        this.model.height = window.innerHeight;

        LayoutUtils.fitRectIn(
            this.view.container,
            {
                width: window.innerWidth,
                height: window.innerHeight
            },
            GameConstants.layout.viewport
        )
        this.model.dispatch(GameEvent.RESIZE);
    }

}
