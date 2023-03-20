import { CommandBase } from './CommandBase';
import { CommandResolveBase } from './CommandResolveBase';

export class SimultaneousCommandBase extends CommandResolveBase {
    private commands: CommandBase[] = [];

    add(command: CommandBase): SimultaneousCommandBase {
        this.commands.push(command);
        return this;
    }

    reset() {
        this.commands.forEach((command) => {
            command.reset();
        });
    }

    protected internalRun(): void {
        const promises: Promise<any>[] = [];
        this.commands.forEach((command) => {
            if (command.guard()) {
                promises.push(command.run());
            }
        });
        if (promises.length > 0) {
            Promise.all(promises).then(() => {
                this.internalResolve();
            });
        } else {
            this.internalResolve();
        }
    }

    destroy() {
        this.commands.forEach((command) => {
            command.destroy();
        });
        this.commands = null;
        super.destroy();
    }
}
