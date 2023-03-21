import * as PIXI from "pixi.js";
import {StartButton} from "../components/StartButton";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameTextStyles} from "../constants/GameTextStyles";
import {LangUtil} from "../utils/LangUtil";

export class StartView {

    container: PIXI.Container;

    bg: PIXI.NineSlicePlane;

    button: StartButton;

    label: PIXI.Text;

    constructor() {
        this.container = new PIXI.Container();
        this.container.x = 42;
        this.container.y = 785;

        this.bg = new PIXI.NineSlicePlane(ResourceUtils.getTexture('startPopupBg.png'), 37,45,37,45);
        this.bg.width = 1003;
        this.container.addChild(this.bg);

        this.label = new PIXI.Text();
        this.label.x = 140;
        this.label.y = 37;
        this.label.style = GameTextStyles.startLabel;
        this.label.text = LangUtil.get(LangUtil.keys.startLabel);
        this.container.addChild(this.label);

        this.button = new StartButton();
        this.button.container.x = 233;
        this.button.container.y = 175;
        this.container.addChild(this.button.container);
    }

}
