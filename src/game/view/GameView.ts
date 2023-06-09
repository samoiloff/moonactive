import {ViewBase} from "../../common/mvc/ViewBase";
import * as PIXI from "pixi.js";
import {GameModel} from "../model/GameModel";
import {GameConstants} from "../constants/GameConstants";
import {StartView} from "./StartView";
import {ShadowView} from "./ShadowView";
import {dGet} from "../../common/di/dGet";
import {FieldView} from "./FieldView";
import {TimerView} from "./TimerView";
import {WinView} from "./WinView";
import {LooseView} from "./LooseView";
import {BackgroundView} from "./BackgroundView";

export class GameView extends ViewBase {
    app: PIXI.Application;
    interactionManager: PIXI.InteractionManager;

    container: PIXI.Container;

    background: BackgroundView;
    shadowView: ShadowView;
    startView: StartView;
    fieldView: FieldView;
    timerView: TimerView;

    winView: WinView;
    looseView: LooseView;

    constructor(model: GameModel) {
        super(model);

        this.app = new PIXI.Application({
            resizeTo: window,
            antialias: true,
            transparent: false,
            resolution: 1,
            backgroundColor: 0xcfeffc
        });
        document.body.appendChild(this.app.view);
        this.interactionManager = this.app.renderer.plugins.interaction;

        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.app.stage.addChild(this.container);
    }

    public init(): void {
        this.background = dGet(BackgroundView);
        this.container.addChild(this.background.container)

        this.fieldView = dGet(FieldView);
        this.container.addChild(this.fieldView.container);

        this.timerView = dGet(TimerView);
        this.container.addChild(this.timerView.container);

        this.shadowView  = dGet(ShadowView);
        this.container.addChild(this.shadowView.container);

        this.startView = dGet(StartView);
        this.container.addChild(this.startView.container);

        this.winView = dGet(WinView);
        this.container.addChild(this.winView.container);

        this.looseView = dGet(LooseView);
        this.container.addChild(this.looseView.container);
    }

}
