import { Gender, GrammaticalCase } from '../language';
import { DeclensionRule, DeclensionRuleInflector } from '../word-declension';
import { NameInflector } from './name-inflector';

export class MiddleNameInflector extends NameInflector {
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
      .filter((rule) => rule.usage.includes('middleName'))
      .filter((rule) => new RegExp(rule.pattern.find, 'gi').test(word));

    if (!rule) {
      return word;
    }

    return new DeclensionRuleInflector(rule).inflect(word, grammaticalCase);
  }
}
