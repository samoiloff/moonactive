import {DiContextManager} from "./DiContextManager";

export const dGet = (cls: any, initData?: any[], context?: string): any => {
  return DiContextManager.inject(cls, initData, context);
}
