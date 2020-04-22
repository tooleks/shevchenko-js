import RuleInflector from './RuleInflector';
import NameInflector from './NameInflector';
export default class MiddleNameInflector extends NameInflector {
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
        return new RuleInflector(rule).inflect(middleName, grammaticalCase);
    }
}
//# sourceMappingURL=MiddleNameInflector.js.map