import { AppendCommandRunner } from './append-command-runner';
import { DeclensionCommandRunner } from './declension-command-runner';
import { DeclensionCommand, DeclensionCommandAction } from './declension.types';
import { ReplaceCommandRunner } from './replace-command-runner';

export class CommandRunnerFactory {
  /**
   * Creates a new command runner for the given command.
   */
  make(command: DeclensionCommand): DeclensionCommandRunner {
    switch (command.action) {
      case DeclensionCommandAction.APPEND: {
        return new AppendCommandRunner(command);
      }
      case DeclensionCommandAction.REPLACE: {
        return new ReplaceCommandRunner(command);
      }
      default: {
        throw new TypeError('Invalid command type.');
      }
    }
  }
}
