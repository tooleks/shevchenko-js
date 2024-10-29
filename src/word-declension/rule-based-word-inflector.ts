import { DeclensionRuleInflector } from './declension-rule-inflector';
import { DeclensionRule } from './declension-types';
import { DeclensionParams, WordInflector } from './word-inflector';

export class RuleBasedWordInflector implements WordInflector {
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
        return declensionRule.gender.includes(params.gender);
      })
      .filter((declensionRule) => {
        return (
          !params.applicationType ||
          declensionRule.applicationType.length === 0 ||
          declensionRule.applicationType.includes(params.applicationType)
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

    return matchingRules;
  }
}
