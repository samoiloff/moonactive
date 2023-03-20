import {CommandBase} from "../../common/commands/CommandBase";
import * as FontFaceObserver from 'fontfaceobserver';
import {GameConstants} from "../constants/GameConstants";

export class LoadFontCommand extends CommandBase {

    run(): Promise<any> {
        console.log("LoadFontCommand.start()");
        return new Promise<any>((resolve) => {
            var font = new FontFaceObserver(GameConstants.resources.fontFamily);

            font.load().then(function () {
                console.log("LoadFontCommand.success()");
                resolve(null);
            }).catch(function () {
                console.log("LoadFontCommand.fail()");
                resolve(null);
            });
        });
    }
}
