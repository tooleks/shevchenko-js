import { GrammaticalCase, GrammaticalGender } from '../language';
import {
  DeclensionRule,
  DeclensionRuleInflector,
  isApplicable,
  isGenderApplicable,
  isWordApplicable,
} from '../word-declension';
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
  protected inflectNamePart(
    givenName: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
  ): string {
    const [rule] = this.rules
      .filter((rule) => isGenderApplicable(rule, gender))
      .filter((rule) => isApplicable(rule, 'givenName'))
      .filter((rule) => isWordApplicable(rule, givenName));

    if (rule == null) {
      return givenName;
    }

    return new DeclensionRuleInflector(rule).inflect(givenName, grammaticalCase);
  }
}
