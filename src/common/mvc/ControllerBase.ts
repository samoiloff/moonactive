import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";
import {DebugUtils} from "../di/DebugUtils";

export abstract class ControllerBase {

    constructor(protected model: ModelBase, protected view: ViewBase) {
        DebugUtils.mapObjectToGlobalId(this, this.constructor.name, "c");
        // this.initialize();
    }

    abstract initialize(): void;

    destroy(): void {
        this.model = null;
        this.view = null;
    }

}

