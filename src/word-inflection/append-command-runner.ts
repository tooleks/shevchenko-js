import { InflectorCommandRunner } from './inflector-command-runner';
import { InflectorCommand } from './inflector.types';

export class AppendCommandRunner implements InflectorCommandRunner {
  private readonly command: InflectorCommand;

  constructor(command: InflectorCommand) {
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
