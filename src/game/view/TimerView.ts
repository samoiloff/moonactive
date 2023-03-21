import * as PIXI from "pixi.js";
import {ResourceUtils} from "../utils/ResourceUtils";
import {gsap, Power0} from 'gsap';
import {GameConstants} from "../constants/GameConstants";
import {GameModel} from "../model/GameModel";
import {dGet} from "../../common/di/dGet";
import {GameEvent} from "../constants/GameEvent";

export class TimerView {

    container: PIXI.Container;
    bg: PIXI.NineSlicePlane;
    progress: PIXI.NineSlicePlane;

    gameModel: GameModel = dGet(GameModel);

    constructor() {
        this.container = new PIXI.Container();
        this.container.x = 84;
        this.container.y = 1425;

        this.bg = new PIXI.NineSlicePlane(ResourceUtils.getTexture(GameConstants.textures.timerBg), 10, 10, 10, 10);
        this.bg.width = 900;
        this.container.addChild(this.bg);

        this.progress = new PIXI.NineSlicePlane(ResourceUtils.getTexture(GameConstants.textures.timerProgress), 10, 10, 10, 10);
        this.container.addChild(this.progress);

        this.progress.width = 20;
    }

    reset(): void {
        gsap.killTweensOf(this.progress);
        this.progress.width = 20;
    }

    pauseTimer(): void {
        gsap.killTweensOf(this.progress);
    }

    startTimer(): void {
        this.gameModel.timerStarted = true;
        this.progress.width = 20;
        gsap.to(this.progress, {
            width: this.bg.width,
            duration: GameConstants.field.timeLimit,
            ease: Power0.easeNone,
            onComplete: () => {
                this.gameModel.timerStarted = false;
                this.gameModel.dispatch(GameEvent.TIMER_COMPLETE);
            }
        })
    }

}
