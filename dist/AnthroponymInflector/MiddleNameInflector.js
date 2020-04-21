"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RuleInflector_1 = __importDefault(require("./RuleInflector"));
const NameInflector_1 = __importDefault(require("./NameInflector"));
class MiddleNameInflector extends NameInflector_1.default {
    constructor(rules) {
        super();
        this.rules = rules;
    }
    /**
     * @inheritdoc
     */
    inflectName(middleName, gender, grammaticalCase) {
        const [rule] = this.rules
            .filter(rule => rule.gender.includes(gender))
            .filter(rule => rule.usage.includes('middleName'))
            .filter(rule => new RegExp(rule.pattern.find, 'gi').test(middleName));
        if (rule == null) {
            return middleName;
        }
        return new RuleInflector_1.default(rule).inflect(middleName, grammaticalCase);
    }
}
exports.default = MiddleNameInflector;
//# sourceMappingURL=MiddleNameInflector.js.map