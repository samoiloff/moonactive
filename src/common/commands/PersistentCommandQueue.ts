import {CommandBase} from "./CommandBase";
import {IResolveFunction} from "../di/InjectionData";
import {SimultaneousCommandBase} from "./SimultaneousCommandBase";

export class PersistentCommandQueue extends CommandBase {

  protected _commands: CommandBase[] = [];
  protected _resolve: IResolveFunction;

  protected currentCommandIndex: number = -1;

  add(command: CommandBase): CommandBase {
    this._commands.push(command);
    return command;
  }

  addSync(commands: CommandBase[]): SimultaneousCommandBase {
    const result: SimultaneousCommandBase = new SimultaneousCommandBase();
    commands.forEach((command) => {
      result.add(command);
    });
    this._commands.push(result);
    return result;
  }

  run(): Promise<any> {
    if (this.currentCommandIndex !== -1) {
      throw new Error('Already running');
    }

    return new Promise((resolve) => {
      this._resolve = resolve;
      this.runNextCommand();
    });
  }

  runFromCommand(command: CommandBase): Promise<any> {
    if (this.currentCommandIndex !== -1) {
      throw new Error('Already running');
    }

    const commandIndex: number = this._commands.indexOf(command);
    if (commandIndex < 0) {
      throw new Error("Command not found : " + command);
    }
    this.currentCommandIndex = commandIndex - 1;
    return new Promise((resolve) => {
      this._resolve = resolve;
      this.runNextCommand();
    });
  }

  get isRunning(): boolean {
    return this.currentCommandIndex >= 0;
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

  protected runNextCommand(): void {
    this.currentCommandIndex++;
    if (this.currentCommandIndex < this._commands.length) {
      const command: CommandBase = this._commands[this.currentCommandIndex];
      if (command.guard()) {
        command.run().then(() => {
          this.runNextCommand();
        });
      } else {
        this.runNextCommand();
      }
    } else {
      this.readyToResolve();
    }
  }

  protected readyToResolve(): void {
    const resolve: IResolveFunction = this._resolve;
    this._resolve = null;
    this.currentCommandIndex = -1;

    resolve();
  }

  reset() {
    if (this._resolve) {
      if (this.currentCommandIndex >= 0 && this._commands.length > 0) {
        const command: CommandBase = this._commands[this.currentCommandIndex];
        command.reset();
      }
      this.currentCommandIndex = -1;
    }
    super.reset();
  }
}
