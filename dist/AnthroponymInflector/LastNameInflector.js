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
const LangUtils = __importStar(require("../Utils/LangUtils"));
const NameInflector_1 = __importDefault(require("./NameInflector"));
const RuleInflector_1 = __importDefault(require("./RuleInflector"));
class LastNameInflector extends NameInflector_1.default {
    constructor(rules, partOfSpeechRecognizer) {
        super();
        this.rules = rules;
        this.partOfSpeechRecognizer = partOfSpeechRecognizer;
    }
    /**
     * @inheritdoc
     */
    inflectName(lastName, gender, grammaticalCase, last) {
        if (!last && LangUtils.countVowels(lastName) === 1) {
            return lastName;
        }
        const [rule] = this.rules
            .filter(rule => rule.gender.includes(gender))
            .filter(rule => rule.usage.length === 0 || rule.usage.includes('lastName'))
            .filter(rule => new RegExp(rule.pattern.find, 'gi').test(lastName))
            .filter(rule => {
            const partOfSpeech = this.partOfSpeechRecognizer.recognize(lastName, gender);
            return rule.partOfSpeech === partOfSpeech || partOfSpeech == null;
        })
            .sort((firstRule, secondRule) => {
            if (firstRule.usage.length === 0 && secondRule.usage.length > 0 && secondRule.usage.includes('lastName')) {
                return 1;
            }
            return 0;
        });
        if (rule == null) {
            return lastName;
        }
        return new RuleInflector_1.default(rule).inflect(lastName, grammaticalCase);
    }
}
exports.default = LastNameInflector;
//# sourceMappingURL=LastNameInflector.js.map