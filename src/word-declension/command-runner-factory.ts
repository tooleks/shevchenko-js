import { AppendCommandRunner } from './append-command-runner';
import { DeclensionCommandRunner } from './declension-command-runner';
import { DeclensionCommand, DeclensionCommandType } from './declension.types';
import { ReplaceCommandRunner } from './replace-command-runner';

export class CommandRunnerFactory {
  /**
   * Creates a new command runner for the given command.
   */
  make(command: DeclensionCommand): DeclensionCommandRunner {
    switch (command.type) {
      case DeclensionCommandType.APPEND: {
        return new AppendCommandRunner(command);
      }
      case DeclensionCommandType.REPLACE: {
        return new ReplaceCommandRunner(command);
      }
      default: {
        throw new TypeError('Invalid command type.');
      }
    }
  }
}
