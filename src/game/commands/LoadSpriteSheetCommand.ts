import {CommandBase} from "../../common/commands/CommandBase";
import * as PIXI from "pixi.js";
import {GameConstants} from "../constants/GameConstants";

export class LoadSpriteSheetCommand extends CommandBase {

    run(): Promise<any> {
        console.log("LoadSpriteSheetCommand.start()");
        return new Promise<any>((resolve) => {
            GameConstants.spritesheets.forEach((spritesheet) => {
                PIXI.Loader.shared.add(spritesheet);
            });

            PIXI.Loader.shared.load(() => {
                console.log("LoadSpriteSheetCommand.complete()");
                resolve(null);
            });
        })
    }
}
