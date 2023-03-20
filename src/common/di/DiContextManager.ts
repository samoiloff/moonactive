import {DiContext} from "./DiContext";
import {IContexts, InjectionData} from "./InjectionData";

export class DiContextManager {

  static DEFAULT = "default";

  static contexts: IContexts = new Map<string, DiContext>();

  static getContext(contextId?: string): DiContext {
    if (!contextId) {
      contextId = DiContextManager.DEFAULT;
    }

    let context: DiContext = DiContextManager.contexts.get(contextId);
    if (!context) {
      context = new DiContext()
      DiContextManager.contexts.set(contextId, context);
    }
    return context;
  }

  static inject(cls: any, initData?: any[], contextId?: string): any {
    return DiContextManager.getContext(contextId).instantiate(cls, initData);
  }

  static map(cls: any, contextId: string = null): InjectionData {
    const context: DiContext = DiContextManager.getContext(contextId)
    let injection: InjectionData = context.data.get(cls.name);
    if (!injection) {
      injection = new InjectionData();
      injection.keyCls = cls;
      injection.instanceCls = cls;
      context.data.set(cls.name, injection);
    }
    return injection;
  }

  static unmap(cls: any, contextId: string = null): void {
    const context: DiContext = DiContextManager.getContext(contextId)

    if (context.data.has(cls.name)) {
      const injection: InjectionData = context.data.get(cls.name);
      injection.destroy();
      context.data.delete(cls.name);
    }
  }
}
