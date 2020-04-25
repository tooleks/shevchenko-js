import InflectorRule from './InflectorRule';
import Gender from '../Core/Gender';
import GrammaticalCase from '../Core/GrammaticalCase';
import RuleInflector from './RuleInflector';
import NameInflector from './NameInflector';

export default class FirstNameInflector extends NameInflector {
  private readonly rules: InflectorRule[];

  constructor(rules: InflectorRule[]) {
    super();
    this.rules = rules;
  }

  /**
   * @inheritdoc
   */
  protected inflectName(firstName: string, gender: Gender, grammaticalCase: GrammaticalCase): string {
    const [rule] = this.rules
      .filter(rule => rule.gender.includes(gender))
      .filter(rule => rule.usage.length === 0 || rule.usage.includes('firstName'))
      .filter(rule => new RegExp(rule.pattern.find, 'gi').test(firstName))
      .sort((firstRule, secondRule) => {
        if (firstRule.usage.length === 0) {
          return 0;
        }
        if (secondRule.usage.length > 0) {
          return 0;
        }
        if (secondRule.usage.includes('firstName')) {
          return 0;
        }
        return 1;
      });

    if (rule == null) {
      return firstName;
    }

    return new RuleInflector(rule).inflect(firstName, grammaticalCase);
  }
}
