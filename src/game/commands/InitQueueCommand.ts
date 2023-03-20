import {SingleRunCommandQueue} from "../../common/commands/SingleRunCommandQueue";
import {LoadFontCommand} from "./LoadFontCommand";
import {dGet} from "../../common/di/dGet";

export class InitQueueCommand extends SingleRunCommandQueue {

    constructor() {
        super();
        this.add(dGet(LoadFontCommand));
    }

}
