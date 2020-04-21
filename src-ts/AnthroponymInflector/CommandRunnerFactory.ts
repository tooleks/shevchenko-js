import InflectorCommand from './InflectorCommand';
import InflectorCommandType from './InflectorCommandType';
import AppendCommandRunner from './AppendCommandRunner';
import ReplaceCommandRunner from './ReplaceCommandRunner';
import InflectorCommandRunner from './InflectorCommandRunner';

export default class CommandRunnerFactory {
  /**
   * Creates a new command runner for a given command.
   */
  make(command: InflectorCommand): InflectorCommandRunner {
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
