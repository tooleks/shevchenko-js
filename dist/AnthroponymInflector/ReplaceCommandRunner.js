"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReplaceCommandRunner {
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
exports.default = ReplaceCommandRunner;
//# sourceMappingURL=ReplaceCommandRunner.js.map