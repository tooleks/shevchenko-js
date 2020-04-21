import InflectorRule from './InflectorRule';
import Gender from '../Core/Gender';
import GrammaticalCase from '../Core/GrammaticalCase';
import RuleInflector from './RuleInflector';
import NameInflector from './NameInflector';

export default class MiddleNameInflector extends NameInflector {
  private readonly rules: InflectorRule[];

  constructor(rules: InflectorRule[]) {
    super();
    this.rules = rules;
  }

  /**
   * @inheritdoc
   */
  protected inflectName(middleName: string, gender: Gender, grammaticalCase: GrammaticalCase): string {
    const [rule] = this.rules
      .filter((rule) => rule.gender.includes(gender))
      .filter((rule) => rule.usage.includes('middleName'))
      .filter((rule) => new RegExp(rule.pattern.find, 'gi').test(middleName));

    if (rule == null) {
      return middleName;
    }

    return new RuleInflector(rule).inflect(middleName, grammaticalCase);
  }
}
