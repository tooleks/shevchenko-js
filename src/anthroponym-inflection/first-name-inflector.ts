import { Gender, GrammaticalCase } from '../core';
import { InflectorRule } from './inflector.types';
import { NameInflector } from './name-inflector';
import { RuleInflector } from './rule-inflector';

export class FirstNameInflector extends NameInflector {
  private readonly rules: InflectorRule[];

  constructor(rules: InflectorRule[]) {
    super();
    this.rules = rules;
  }

  /**
   * @inheritdoc
   */
  protected inflectWord(word: string, gender: Gender, grammaticalCase: GrammaticalCase): string {
    const [rule] = this.rules
      .filter((rule) => rule.gender.includes(gender))
      .filter((rule) => rule.usage.length === 0 || rule.usage.includes('firstName'))
      .filter((rule) => new RegExp(rule.pattern.find, 'gi').test(word))
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

    if (!rule) {
      return word;
    }

    return new RuleInflector(rule).inflect(word, grammaticalCase);
  }
}
