import {CommandBase} from "../../common/commands/CommandBase";
import {LangUtil} from "../utils/LangUtil";

export class LoadLocalizationCommand extends CommandBase {

    run(): Promise<any> {
        return new Promise((resolve) => {
            this.readFile('./lang/en.json').then((lang) => {
                LangUtil.lang = lang;
                resolve(null);
            });
        });
    }

    readFile(file: string): Promise<any> {
        return new Promise<any>((resolve) => {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status == 0) {
                        var allText = rawFile.responseText;
                        var value = JSON.parse(allText);
                        resolve(value);
                    }
                }
            }
            rawFile.send(null);
        });
    }
}
