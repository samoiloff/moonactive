import {EventDispatcher} from "./EventDispatcher";
import {ComponentBase} from "./ComponentBase";
import {DebugUtils} from "../di/DebugUtils";

export abstract class ModelBase extends EventDispatcher {

    constructor(public component: ComponentBase) {
        super();
        DebugUtils.mapObjectToGlobalId(this, this.constructor["name"], "m");
    }

    destroy(): void {
        this.component = null;
        super.removeAllListeners();
    }
}
