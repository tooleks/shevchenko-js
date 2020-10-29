import { InflectorCommandRunner } from './inflector-command-runner';
import { InflectorCommand } from './inflector.types';

export class ReplaceCommandRunner implements InflectorCommandRunner {
  private readonly command: InflectorCommand;

  constructor(command: InflectorCommand) {
    this.command = command;
  }

  /**
   * Replaces a given value with the command value.
   * Returns a new value.
   */
  exec(value: string): string {
    return this.command.value;
  }
}
