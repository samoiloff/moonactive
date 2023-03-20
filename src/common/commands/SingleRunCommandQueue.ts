import {CommandBase} from "./CommandBase";

export type CallbackType = (param?: any) => any;

export class SingleRunCommandQueue extends CommandBase {

  private _commands: CommandBase[] = [];
  private _resolve: CallbackType;

  constructor() {
    super();
  }

  add(command: CommandBase): void {
    this._commands.push(command);
  }

  run(): Promise<any> {
    if (this._resolve) {
      throw new Error('Already running');
    }

    return new Promise((resolve) => {
      this._resolve = resolve;
      this.runNextCommand();
    });
  }

  reset() {
    if (this._resolve && this._commands.length > 0) {
      this._commands[0].reset();
    }
    this._commands = [];
    this._resolve = null;
    super.reset();
  }

  private runNextCommand(): void {
    if (this._commands.length > 0) {
      const command: CommandBase = this._commands.shift();
      command.run().then(() => {
        command.destroy();
        this.runNextCommand();
      });
    } else {
      this.readyToResolve();
    }
  }

  private readyToResolve(): void {
    const resolve: CallbackType = this._resolve;
    this._resolve = null;
    resolve();
  }

  get running(): boolean {
    return this._resolve !== null;
  }

  destroy() {
    if (this._commands) {
      this._commands.forEach((command: CommandBase) => {
        command.destroy();
      });
      this._commands = null;
      this._resolve = null;
    }
    super.destroy();
  }
}
