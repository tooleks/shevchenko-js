import { InflectionCommand } from './declension-types';
import { InflectionCommandRunner } from './inflection-command-runner';

export class ReplaceCommandRunner implements InflectionCommandRunner {
  private readonly command: InflectionCommand;

  constructor(command: InflectionCommand) {
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
