import { AppendCommandRunner } from './append-command-runner';
import { InflectionCommand, InflectionCommandAction } from './declension-types';
import { InflectionCommandRunner } from './inflection-command-runner';
import { ReplaceCommandRunner } from './replace-command-runner';

export class CommandRunnerFactory {
  /**
   * Creates a new command runner for the given command.
   */
  make(command: InflectionCommand): InflectionCommandRunner {
    switch (command.action) {
      case InflectionCommandAction.APPEND: {
        return new AppendCommandRunner(command);
      }
      case InflectionCommandAction.REPLACE: {
        return new ReplaceCommandRunner(command);
      }
      default: {
        throw new TypeError(`Invalid command action: ${command.action}.`);
      }
    }
  }
}
