import { Gender, GrammaticalCase } from '../language';
import { InflectorRule, RuleInflector } from '../word-inflection';
import { NameInflector } from './name-inflector';

export class MiddleNameInflector extends NameInflector {
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
      .filter((rule) => rule.usage.includes('middleName'))
      .filter((rule) => new RegExp(rule.pattern.find, 'gi').test(word));

    if (!rule) {
      return word;
    }

    return new RuleInflector(rule).inflect(word, grammaticalCase);
  }
}
