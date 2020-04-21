"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppendCommandRunner {
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
exports.default = AppendCommandRunner;
//# sourceMappingURL=AppendCommandRunner.js.map