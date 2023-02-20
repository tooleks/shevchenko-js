import { GrammaticalCase, GrammaticalGender, WordClass } from '../language';
import { DeclensionRuleInflector } from './declension-rule-inflector';
import { DeclensionRule } from './declension-types';

export type CustomRuleFilter = (
  declensionRule: DeclensionRule,
  index: number,
  declensionRules: DeclensionRule[],
) => boolean;

export interface DeclensionParams {
  grammaticalCase: GrammaticalCase;
  gender: GrammaticalGender;
  wordClass?: WordClass;
  application?: string;
  customRuleFilter?: CustomRuleFilter;
}

export class WordInflector {
  private readonly declensionRules: DeclensionRule[];

  constructor(declensionRules: DeclensionRule[]) {
    this.declensionRules = declensionRules;
  }

  async inflect(word: string, params: DeclensionParams): Promise<string> {
    const [matchedRule] = this.declensionRules
      .filter((declensionRule) => {
        return declensionRule.gender.includes(params.gender);
      })
      .filter((declensionRule) => {
        return (
          !params.application ||
          declensionRule.application.length === 0 ||
          declensionRule.application.includes(params.application)
        );
      })
      .filter((declensionRule) => {
        return new RegExp(declensionRule.pattern.find, 'gi').test(word);
      })
      .filter((declensionRule) => {
        return !params.wordClass || declensionRule.wordClass === params.wordClass;
      })
      .filter((declensionRule, index, declensionRules) => {
        return (
          !params.customRuleFilter ||
          params.customRuleFilter(declensionRule, index, declensionRules)
        );
      });

    if (matchedRule == null) {
      return word;
    }

    return new DeclensionRuleInflector(matchedRule).inflect(word, params.grammaticalCase);
  }
}
