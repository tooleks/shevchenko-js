export default class ReplaceCommandRunner {
    constructor(command) {
        this.command = command;
    }
    /**
     * Replaces a given value with the command value.
     * Returns a new value.
     */
    exec(value) {
        return this.command.value;
    }
}
//# sourceMappingURL=ReplaceCommandRunner.js.map