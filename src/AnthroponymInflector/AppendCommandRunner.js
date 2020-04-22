export default class AppendCommandRunner {
    constructor(command) {
        this.command = command;
    }
    /**
     * Appends the command value to a given value.
     * Returns a new value.
     */
    exec(value) {
        return value + this.command.value;
    }
}
//# sourceMappingURL=AppendCommandRunner.js.map