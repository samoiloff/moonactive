import * as PIXI from "pixi.js";

export class EventDispatcher extends PIXI.utils.EventEmitter {
     logEventsEnabled: boolean = false;
     instanceId: string = "EventDispatcher";

    dispatch(event: string, ...args: any[]): boolean {
        this.logEvent(event, args ? args[0] : null);
        return super.emit(event, ... args);
    }

    emit(event: string | symbol, ...args: any[]): boolean {
        // if (__DEV__ && this.logEventsEnabled) {
        this.logEvent(event, args ? args[0] : null);
        // }
        return super.emit(event, ... args);
    }

    protected logEvent(event: string | symbol, data?: any): void {
        console.groupCollapsed(`${this.instanceId}: ${event.toString()}`);
        console.log(data ? data : "-=NO_DATA=-");
        // TODO: we can print stacktrace here for simplify debugging
        console.trace();
        console.groupEnd();
    }
}
