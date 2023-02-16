import { DeclensionCommandRunner } from './declension-command-runner';
import { DeclensionCommand } from './declension.types';

export class AppendCommandRunner implements DeclensionCommandRunner {
  private readonly command: DeclensionCommand;

  constructor(command: DeclensionCommand) {
    this.command = command;
  }

  /**
   * Appends the command value to the given value.
   * Returns a new value.
   */
  exec(value: string): string {
    return value + this.command.value;
  }
}
