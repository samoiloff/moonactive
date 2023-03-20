export class DebugUtils {
    static key = "__windowId__";
    static mapObjectToGlobalId(object: any, id: string, prefix: string): void {
        const windowId: any = `${prefix}_${id}`;
        object[DebugUtils.key] = windowId;
        window[windowId] = object;
    }

    static unmapObjectToGlobalId(object: any) {
        const windowId: any = object[DebugUtils.key];
        if (windowId && window[windowId]) {
            delete object[DebugUtils.key];
            delete window[windowId];
        }
    }
}
