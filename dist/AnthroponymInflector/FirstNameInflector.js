"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RuleInflector_1 = __importDefault(require("./RuleInflector"));
const NameInflector_1 = __importDefault(require("./NameInflector"));
class FirstNameInflector extends NameInflector_1.default {
    constructor(rules) {
        super();
        this.rules = rules;
    }
    /**
     * @inheritdoc
     */
    inflectName(firstName, gender, grammaticalCase) {
        const [rule] = this.rules
            .filter(rule => rule.gender.includes(gender))
            .filter(rule => rule.usage.length === 0 || rule.usage.includes('firstName'))
            .filter(rule => new RegExp(rule.pattern.find, 'gi').test(firstName))
            .sort((firstRule, secondRule) => {
            if (firstRule.usage.length === 0 && secondRule.usage.length > 0 && secondRule.usage.includes('firstName')) {
                return 1;
            }
            return 0;
        });
        if (rule == null) {
            return firstName;
        }
        return new RuleInflector_1.default(rule).inflect(firstName, grammaticalCase);
    }
}
exports.default = FirstNameInflector;
//# sourceMappingURL=FirstNameInflector.js.map