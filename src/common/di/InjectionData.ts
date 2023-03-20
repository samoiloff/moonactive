import {DiContext} from "./DiContext";

export type IResolveFunction = (param?: any) => any;

export class InjectionData {
  keyCls: any;
  instanceCls: any;
  isSingletone: boolean;
  initParams?: any[];
  instance: any;

  destroy(): void {
    this.keyCls = null;
    this.instanceCls = null;
    this.initParams = null;
    if (this.instance) {
      if (this.instance.hasOwnProperty("destroy")) {
        this.instance.destroy();
        this.instance = null;
      }
    }
  }

  asSingletone(value: boolean = true): InjectionData {
    this.isSingletone = value;
    return this;
  }

  withParams(value: any[]): InjectionData {
    this.initParams = value;
    return this;
  }

  toClass(value: any): InjectionData {
    this.instanceCls = value;
    return this;
  }

  toInstance(value: any): InjectionData {
    this.instance = value;
    return this;
  }

}
export type IContextData = Map<any, InjectionData>;
export type IContexts = Map<string, DiContext>;
