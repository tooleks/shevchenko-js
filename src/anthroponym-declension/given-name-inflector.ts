import { GrammaticalCase, GrammaticalGender } from '../language';
import { DeclensionRule, DeclensionRuleInflector } from '../word-declension';
import { NameInflector } from './name-inflector';

export class GivenNameInflector extends NameInflector {
  private readonly rules: DeclensionRule[];

  constructor(rules: DeclensionRule[]) {
    super();
    this.rules = rules;
  }

  /**
   * @inheritdoc
   */
  protected inflectWord(
    word: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
  ): string {
    const [rule] = this.rules
      .filter((rule) => rule.gender.includes(gender))
      .filter((rule) => rule.application.length === 0 || rule.application.includes('givenName'))
      .filter((rule) => new RegExp(rule.pattern.find, 'gi').test(word))
      .sort((firstRule, secondRule) => {
        if (firstRule.application.length === 0) {
          return 0;
        }
        if (secondRule.application.length > 0) {
          return 0;
        }
        if (secondRule.application.includes('firstName')) {
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
