import {CommandBase} from "../../common/commands/CommandBase";
import * as FontFaceObserver from 'fontfaceobserver';

export class LoadFontCommand extends CommandBase {

    run(): Promise<any> {
        var font = new FontFaceObserver('Chango');

        font.load().then(function () {
            console.log('Output Sans has loaded.');
        }).catch(function () {
            console.log('Output Sans failed to load.');
        });
        return super.run();
    }
}
