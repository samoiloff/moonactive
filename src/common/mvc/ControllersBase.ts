import {ControllerBase} from "./ControllerBase";
import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";
import {dGet} from "../di/dGet";

export abstract class ControllersBase extends ControllerBase {

    protected controllers: Record<any, ControllerBase>;

    constructor(model: ModelBase, view: ViewBase) {
        super(model, view);
    }

    initialize() {
        this.controllers = {};
    }

    addController(controllerClass: any): void {
        let controller: ControllerBase = controllerClass[controllerClass.toString()];
        if (controller) {
            throw new Error(this + " already has controller with name : " + controller);
        } else {
            controller = dGet(controllerClass, [this.model, this.view]);
            this.controllers[controllerClass.toString()] = controller;
            controller.initialize();
        }
    }

    removeController(controllerCls: new (model: ModelBase, view: ViewBase) => ControllerBase): void {
        const controller: ControllerBase = controllerCls[controllerCls.toString()];
        controller.destroy();
        delete controllerCls[controllerCls.toString()];
    }

    removeAllControllers(): void {
        for (const field of Object.keys(this.controllers)) {
            const controller: ControllerBase = this.controllers[field];
            if (controller) {
                controller.destroy();
                delete this.controllers[field];
            }
        }
    }

}

