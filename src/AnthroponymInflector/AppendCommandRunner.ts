import InflectorCommandRunner from './InflectorCommandRunner';
import InflectorCommand from './InflectorCommand';

export default class AppendCommandRunner implements InflectorCommandRunner {
  private readonly command: InflectorCommand;

  constructor(command: InflectorCommand) {
    this.command = command;
  }

  /**
   * Appends the command value to a given value.
   * Returns a new value.
   */
  exec(value: string): string {
    return value + this.command.value;
  }
}
