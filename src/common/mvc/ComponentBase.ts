import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";
import {ControllerBase} from "./ControllerBase";
import {dGet} from "../di/dGet";
import {DebugUtils} from "../di/DebugUtils";

export type ModelType = new (component: ComponentBase) => ModelBase;
export type ViewType = new (model: ModelBase) => ViewBase;
export type ControllerType = new (model: ModelBase, view: ViewBase) => ControllerBase;

export abstract class ComponentBase {

    protected model: ModelBase;
    protected view: ViewBase;
    protected controllerBase: ControllerBase;

    constructor(
            modelCls: ModelType,
            viewCls: ViewType,
            controllerCls: ControllerType) {
        this.model = dGet(modelCls, [this]);
        this.view = dGet(viewCls, [this.model]);
        this.controllerBase = dGet(controllerCls, [this.model, this.view]);
        this.controllerBase.initialize();
        DebugUtils.mapObjectToGlobalId(this, this.constructor["name"], "p");
    }

    getModel(): ModelBase {
        return this.model;
    }

}
