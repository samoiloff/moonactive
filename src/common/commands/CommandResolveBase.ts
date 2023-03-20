import {CommandBase} from "./CommandBase";

export abstract class CommandResolveBase extends CommandBase {

  protected resolve: (value?: any) => void;

  run(): Promise<any> {
    if (this.resolve) {
      throw  new Error('Already in progress');
    }
    return new Promise<any>((resolve) => {
      this.resolve = resolve;
      this.internalRun();
    });
  }

  reset(): void {
    this.resolve = null;
    this.internalResolve();
  }

  protected abstract internalRun(): void;

  protected internalResolve(): void {
    const resolve = this.resolve;
    this.resolve = null;
    if (resolve) {
      resolve();
    }
  }



}
