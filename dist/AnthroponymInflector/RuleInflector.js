"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegExpUtils = __importStar(require("../Utils/RegExpUtils"));
const StringUtils = __importStar(require("../Utils/StringUtils"));
const CommandRunnerFactory_1 = __importDefault(require("./CommandRunnerFactory"));
class RuleInflector {
    constructor(rule) {
        this.rule = rule;
        this.commandRunnerFactory = new CommandRunnerFactory_1.default();
    }
    /**
     * Inflects a given word in a given grammatical case using the rule.
     */
    inflect(word, grammaticalCase) {
        const [commands] = this.rule.grammaticalCases[grammaticalCase];
        if (commands) {
            const searchValue = new RegExp(this.rule.pattern.modify, 'gi');
            const inflectedWord = word.replace(searchValue, (match, ...groups) => {
                let replacer = '';
                const groupCount = RegExpUtils.countGroups(this.rule.pattern.modify);
                for (let groupIndex = 0; groupIndex < groupCount; groupIndex += 1) {
                    let value = groups[groupIndex];
                    const command = commands[groupIndex];
                    if (command != null) {
                        value = this.commandRunnerFactory.make(command).exec(value);
                    }
                    replacer += value;
                }
                return replacer;
            });
            return StringUtils.copyLetterCase(word, inflectedWord);
        }
        return word;
    }
}
exports.default = RuleInflector;
//# sourceMappingURL=RuleInflector.js.map