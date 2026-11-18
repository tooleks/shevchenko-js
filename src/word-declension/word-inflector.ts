import { GrammaticalCase, GrammaticalGender, WordClass } from '../language';
import { DeclensionRuleInflector } from './declension-rule-inflector';
import { ApplicationType, DeclensionRule } from './declension-types';

export type CustomRuleFilter = (
  declensionRule: DeclensionRule,
  index: number,
  declensionRules: DeclensionRule[],
) => boolean;

export type DeclensionParams = {
  grammaticalCase: GrammaticalCase;
  gender?: GrammaticalGender;
  wordClass?: WordClass;
  applicationType?: ApplicationType;
  customRuleFilter?: CustomRuleFilter;
};

export class WordInflector {
  private readonly declensionRules: DeclensionRule[];

  constructor(declensionRules: DeclensionRule[]) {
    this.declensionRules = [...declensionRules].sort(
      (firstRule, lastRule) => lastRule.priority - firstRule.priority,
    );
  }

  async inflect(word: string, params: DeclensionParams): Promise<string> {
    const [matchingRule] = await this.findMatchingRules(word, params);

    if (matchingRule == null) {
      return word;
    }

    return new DeclensionRuleInflector(matchingRule).inflect(word, params.grammaticalCase);
  }

  /**
   * Finds matching declension rules for the given word.
   */
  private async findMatchingRules(
    word: string,
    params: DeclensionParams,
  ): Promise<DeclensionRule[]> {
    const matchingRules = this.declensionRules
      .filter((declensionRule) => {
        return !params.gender || declensionRule.gender.includes(params.gender);
      })
      .filter((declensionRule) => {
        return (
          declensionRule.applicationType.length === 0 ||
          (!!params.applicationType &&
            declensionRule.applicationType.includes(params.applicationType))
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

    return matchingRules.sort(
      (firstRule, lastRule) =>
        lastRule.priority - firstRule.priority ||
        this.rankApplicationType(lastRule, params.applicationType) -
          this.rankApplicationType(firstRule, params.applicationType),
    );
  }

  /**
   * Breaks ties between rules of equal priority in favour of rules for the requested application type.
   */
  private rankApplicationType(
    declensionRule: DeclensionRule,
    applicationType?: ApplicationType,
  ): number {
    return applicationType && declensionRule.applicationType.includes(applicationType) ? 1 : 0;
  }
}
