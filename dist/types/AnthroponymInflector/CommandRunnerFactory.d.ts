import InflectorCommand from './InflectorCommand';
import InflectorCommandRunner from './InflectorCommandRunner';
export default class CommandRunnerFactory {
    /**
     * Creates a new command runner for a given command.
     */
    make(command: InflectorCommand): InflectorCommandRunner;
}
//# sourceMappingURL=CommandRunnerFactory.d.ts.map