import { GrammaticalCase, GrammaticalGender } from '../language';
import {
  DeclensionRule,
  DeclensionRuleInflector,
  isGenderApplicable,
  isStriclyApplicable,
  isWordApplicable,
} from '../word-declension';
import { NameInflector } from './name-inflector';

export class PatronymicNameInflector extends NameInflector {
  private readonly rules: DeclensionRule[];

  constructor(rules: DeclensionRule[]) {
    super();
    this.rules = rules;
  }

  /**
   * @inheritdoc
   */
  protected inflectNamePart(
    patronymicName: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
  ): string {
    const [rule] = this.rules
      .filter((rule) => isGenderApplicable(rule, gender))
      .filter((rule) => isStriclyApplicable(rule, 'patronymicName'))
      .filter((rule) => isWordApplicable(rule, patronymicName));

    if (rule == null) {
      return patronymicName;
    }

    return new DeclensionRuleInflector(rule).inflect(patronymicName, grammaticalCase);
  }
}
