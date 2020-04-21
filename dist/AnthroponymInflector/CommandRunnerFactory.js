"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InflectorCommandType_1 = __importDefault(require("./InflectorCommandType"));
const AppendCommandRunner_1 = __importDefault(require("./AppendCommandRunner"));
const ReplaceCommandRunner_1 = __importDefault(require("./ReplaceCommandRunner"));
class CommandRunnerFactory {
    /**
     * Creates a new command runner for a given command.
     */
    make(command) {
        switch (command.type) {
            case InflectorCommandType_1.default.Append: {
                return new AppendCommandRunner_1.default(command);
            }
            case InflectorCommandType_1.default.Replace: {
                return new ReplaceCommandRunner_1.default(command);
            }
            default: {
                throw new TypeError('Invalid command type.');
            }
        }
    }
}
exports.default = CommandRunnerFactory;
//# sourceMappingURL=CommandRunnerFactory.js.map