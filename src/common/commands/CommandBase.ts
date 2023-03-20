export abstract class CommandBase {

  run(): Promise<any> {
    return Promise.resolve();
  }

  reset(): void {

  }

  guard(): boolean {
    return true;
  }

  destroy() {

  }

}
