import {Slice9Button} from "./Slice9Button";
import * as PIXI from "pixi.js";
import {ResourceUtils} from "../utils/ResourceUtils";
import {GameConstants} from "../constants/GameConstants";
import {IRectVO} from "../interfaces/IRectVO";
import {GameTextStyles} from "../constants/GameTextStyles";
import {LangUtil} from "../utils/LangUtil";

export class StartButton extends Slice9Button {

    initialize() {
        super.initialize();
        this.setWidth(535);
    }

    getLabel(): string {
        return LangUtil.get(LangUtil.keys.startButton);
    }

    getLabelStyle(): PIXI.TextStyle {
        return GameTextStyles.startButton;
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
