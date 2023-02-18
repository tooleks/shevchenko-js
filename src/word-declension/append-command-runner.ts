import { InflectionCommand } from './declension-types';
import { InflectionCommandRunner } from './inflection-command-runner';

export class AppendCommandRunner implements InflectionCommandRunner {
  private readonly command: InflectionCommand;

  constructor(command: InflectionCommand) {
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
