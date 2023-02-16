import { Gender, GrammaticalCase } from '../language';
import { DeclensionRule, DeclensionRuleInflector } from '../word-declension';
import { NameInflector } from './name-inflector';

export class FirstNameInflector extends NameInflector {
  private readonly rules: DeclensionRule[];

  constructor(rules: DeclensionRule[]) {
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

    return new DeclensionRuleInflector(rule).inflect(word, grammaticalCase);
  }
}
