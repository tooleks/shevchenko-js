import { DeclensionCommandRunner } from './declension-command-runner';
import { DeclensionCommand } from './declension.types';

export class ReplaceCommandRunner implements DeclensionCommandRunner {
  private readonly command: DeclensionCommand;

  constructor(command: DeclensionCommand) {
    this.command = command;
  }

  /**
   * Replaces the given value with the command value.
   * Returns a new value.
   */
  exec(): string {
    return this.command.value;
  }
}
