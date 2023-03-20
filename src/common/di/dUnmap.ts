import {DiContextManager} from "./DiContextManager";

export const dUnmap = (cls: any, context: string = null): void => {
    DiContextManager.unmap(cls, context);
}
