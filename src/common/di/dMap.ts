import {DiContextManager} from "./DiContextManager";
import {InjectionData} from "./InjectionData";

export const dMap = (cls: any, context: string = null): InjectionData => {
  return DiContextManager.map(cls, context);
}
