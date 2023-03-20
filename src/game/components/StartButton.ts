import {Slice9Button} from "./Slice9Button";
import * as PIXI from "pixi.js";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameConstants} from "../constants/GameConstants";
import {IRectVO} from "../interfaces/IRectVO";

export class StartButton extends Slice9Button {

    initialize() {
        super.initialize();
        this.setWidth(535);
    }

    getLabel(): string {
        return "START";
    }

    getLabelStyle(): PIXI.TextStyle {
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

    getTexture(): PIXI.Texture {
        return ResourceUtils.getTexture(GameConstants.textures.startButtonBg);
    }

    getPlaneSlice(): IRectVO {
        return {
            posX: 20,
            posY: 30,
            width: 20,
            height: 30
        };
    }
}
