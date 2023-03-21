import {SingleRunCommandQueue} from "../../common/commands/SingleRunCommandQueue";
import {LoadFontCommand} from "./LoadFontCommand";
import {dGet} from "../../common/di/dGet";
import {LoadSpriteSheetCommand} from "./LoadSpriteSheetCommand";
import {SimultaneousCommandBase} from "../../common/commands/SimultaneousCommandBase";
import {LoadLocalizationCommand} from "./LoadLocalizationCommand";

export class InitQueueCommand extends SingleRunCommandQueue {

    constructor() {
        super();
        this.add(
            new SimultaneousCommandBase()
                .add(dGet(LoadFontCommand))
                .add(dGet(LoadSpriteSheetCommand))
                .add(dGet(LoadLocalizationCommand))
        );
    }

}
