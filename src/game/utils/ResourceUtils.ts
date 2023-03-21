import * as PIXI from "pixi.js";
import {GameConstants} from "../constants/GameConstants";

export class ResourceUtils {

    static getSpriteSheet(name: string = null): PIXI.Spritesheet {
        if (name === null) {
            name = GameConstants.resources.spritesheet0;
        }
        return PIXI.Loader.shared.resources[name].spritesheet;
        // TODO: ** PIXI v 7.x.x **
        // return PIXI.Assets.get(name) as PIXI.Spritesheet;
    }

    static getTexture(textureName: string): PIXI.Texture {
        for (let index: number = 0; index < GameConstants.spritesheets.length; index++) {
            const spritesheet: PIXI.Spritesheet = PIXI.Loader.shared.resources[GameConstants.spritesheets[index]].spritesheet;
            if (spritesheet.textures[textureName]) {
                return spritesheet.textures[textureName];
            }
        }
        return null;
    }

}
