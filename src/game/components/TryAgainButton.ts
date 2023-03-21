import {LangUtil} from "../utils/LangUtil";
import {StartButton} from "./StartButton";
import * as PIXI from "pixi.js";
import {GameTextStyles} from "../constants/GameTextStyles";

export class TryAgainButton extends StartButton {

    initialize() {
        super.initialize();
        this.setWidth(750);
    }

    getLabelStyle(): PIXI.TextStyle {
        return GameTextStyles.startButton;
    }

    getLabel(): string {
        return LangUtil.get(LangUtil.keys.tryAgain);
    }

}
