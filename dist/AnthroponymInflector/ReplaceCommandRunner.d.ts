import InflectorCommandRunner from './InflectorCommandRunner';
import InflectorCommand from './InflectorCommand';
export default class ReplaceCommandRunner implements InflectorCommandRunner {
    private readonly command;
    constructor(command: InflectorCommand);
    /**
     * Replaces a given value with the command value.
     * Returns a new value.
     */
    exec(value: string): string;
}
