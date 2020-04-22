import InflectorCommandRunner from './InflectorCommandRunner';
import InflectorCommand from './InflectorCommand';
export default class AppendCommandRunner implements InflectorCommandRunner {
    private readonly command;
    constructor(command: InflectorCommand);
    /**
     * Appends the command value to a given value.
     * Returns a new value.
     */
    exec(value: string): string;
}
//# sourceMappingURL=AppendCommandRunner.d.ts.map