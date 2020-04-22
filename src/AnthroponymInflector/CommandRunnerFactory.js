import InflectorCommandType from './InflectorCommandType';
import AppendCommandRunner from './AppendCommandRunner';
import ReplaceCommandRunner from './ReplaceCommandRunner';
export default class CommandRunnerFactory {
    /**
     * Creates a new command runner for a given command.
     */
    make(command) {
        switch (command.type) {
            case InflectorCommandType.Append: {
                return new AppendCommandRunner(command);
            }
            case InflectorCommandType.Replace: {
                return new ReplaceCommandRunner(command);
            }
            default: {
                throw new TypeError('Invalid command type.');
            }
        }
    }
}
//# sourceMappingURL=CommandRunnerFactory.js.map