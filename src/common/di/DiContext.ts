import {IContextData, InjectionData} from "./InjectionData";
import {DebugUtils} from "./DebugUtils";

export class DiContext {

  data: IContextData = new Map<any, InjectionData>();

  instantiate(cls: any, initParams?: any[]): any {
    const injection: InjectionData = this.data.get(cls.name);
    if (injection) {
      if (!injection.instance) {
        if (injection.isSingletone) {
          injection.instance = this.createInstance(injection, initParams);
        } else {
          return this.createInstance(injection, initParams);
        }
      }
      return injection.instance;
    } else {
      throw new Error("Injection not found : " + cls.name);
    }

  }

  protected createInstance(injection: InjectionData, initParams?: any[]): any {
    let instance: any;
    if (initParams) {
      instance = new injection.instanceCls(... initParams);
    } else {
      if (injection.initParams) {
        instance = new injection.instanceCls(... injection.initParams);
      } else {
        instance = new injection.instanceCls();
      }
    }

    DebugUtils.mapObjectToGlobalId(instance, injection.keyCls.name, "d");

    return instance;
  }

}
