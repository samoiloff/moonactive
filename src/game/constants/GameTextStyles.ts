import * as PIXI from 'pixi.js';
import {GameConstants} from "./GameConstants";

export class GameTextStyles {
    public static startButton: PIXI.TextStyle = GameTextStyles.getStartButton();
    public static startLabel: PIXI.TextStyle = GameTextStyles.getStartLabel();
    public static tryAgainButton: PIXI.TextStyle = GameTextStyles.getTryAgainButton();

    private static getStartButton(): PIXI.TextStyle {
        const result: PIXI.TextStyle =  new PIXI.TextStyle();
        result.fill = 0xffffff;
        result.fontFamily = GameConstants.resources.fontFamily;
        result.fontWeight = "normal";
        result.dropShadow = true;
        result.dropShadowDistance = 1;
        result.fontSize = 56;
        result.align = "center";
        return result;
    }

    private static getTryAgainButton(): PIXI.TextStyle {
        const result: PIXI.TextStyle =  new PIXI.TextStyle();
        result.fill = 0xffffff;
        result.fontFamily = GameConstants.resources.fontFamily;
        result.fontWeight = "normal";
        result.dropShadow = true;
        result.dropShadowDistance = 1;
        result.fontSize = 85;
        result.align = "center";
        return result;
    }

    private static getStartLabel(): PIXI.TextStyle {
        const result: PIXI.TextStyle =  new PIXI.TextStyle();
        result.fill = 0x687164;
        result.fontFamily = GameConstants.resources.fontFamily;
        result.fontWeight = "normal";
        result.dropShadow = false;
        result.fontSize = 49;
        result.align = "center";
        return result;
    }


}
