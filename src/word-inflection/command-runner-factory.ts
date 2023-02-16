import { AppendCommandRunner } from './append-command-runner';
import { InflectorCommandRunner } from './inflector-command-runner';
import { InflectorCommand, InflectorCommandType } from './inflector.types';
import { ReplaceCommandRunner } from './replace-command-runner';

export class CommandRunnerFactory {
  /**
   * Creates a new command runner for the given command.
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
