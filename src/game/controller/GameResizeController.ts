import {GameControllerBase} from "./GameControllerBase";
import {LayoutUtils} from "../utils/LayoutUtils";
import {GameEvent} from "../constants/GameEvent";
import {GameConstants} from "../constants/GameConstants";
import {OrientationType} from "../constants/OrientationType";
import {GameController} from "./GameController";
import {ISizeVO} from "../interfaces/ISizeVO";

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

    protected detectSize(): ISizeVO {
        var ratio = window.devicePixelRatio || 1;
        return {
            width: this.view.app.renderer.width,
            height: this.view.app.renderer.height
        };
    }

    protected resize(): void {
        const size: ISizeVO = this.detectSize();
        // this.view.app.renderer.resize(size.width, size.height);
        console.log(`onResize(window) : ${size.width}:${size.height}`);
        console.log(`onResize(app) : ${this.view.app.view.width}:${this.view.app.view.height}`);

        if (size.height > size.width) {
            this.model.width = GameConstants.layout.viewportPortrait.width;
            this.model.height = GameConstants.layout.viewportPortrait.height;
            this.model.setOrientation(OrientationType.PORTRAIT);
            LayoutUtils.fitRectIn(
                this.view.container,
                {
                    width: size.width,
                    height: size.height
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
                    width: size.width,
                    height: size.height
                },
                GameConstants.layout.viewportLandscape
            )
        }

        this.model.dispatch(GameEvent.RESIZE);
    }

}
