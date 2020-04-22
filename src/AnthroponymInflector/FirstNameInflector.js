import RuleInflector from './RuleInflector';
import NameInflector from './NameInflector';
export default class FirstNameInflector extends NameInflector {
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
        return new RuleInflector(rule).inflect(firstName, grammaticalCase);
    }
}
//# sourceMappingURL=FirstNameInflector.js.map