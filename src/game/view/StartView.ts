import * as PIXI from "pixi.js";
import {StartButton} from "../components/StartButton";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameTextStyles} from "../constants/GameTextStyles";
import {LangUtil} from "../utils/LangUtil";
import {OrientatedViewBase} from "./OrientatedViewBase";
import {OrientationType} from "../constants/OrientationType";

export class StartView extends OrientatedViewBase{

    container: PIXI.Container;

    bg: PIXI.NineSlicePlane;

    button: StartButton;

    label: PIXI.Text;

    protected initialize() {
        this.container = new PIXI.Container();

        this.bg = new PIXI.NineSlicePlane(ResourceUtils.getTexture('startPopupBg.png'), 37,45,37,45);
        this.bg.width = 1003;
        this.container.addChild(this.bg);

        this.label = new PIXI.Text();
        this.label.style = GameTextStyles.startLabel;
        this.label.text = LangUtil.get(LangUtil.keys.startLabel);
        this.container.addChild(this.label);

        this.button = new StartButton();
        this.container.addChild(this.button.container);

        this.label.x = 140;
        this.label.y = 37;
        this.button.container.x = 233;
        this.button.container.y = 175;

        super.initialize();
    }

    onOrientationChanged() {
        if (this.gameModel.orientation === OrientationType.PORTRAIT) {
            this.container.x = 42;
            this.container.y = 785;
        } else {
            this.container.x = 450;
            this.container.y = 460;
        }
    }

}
