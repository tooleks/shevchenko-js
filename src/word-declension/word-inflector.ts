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
  gender: GrammaticalGender;
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
    // Normalize to NFC (Canonical Decomposition followed by Canonical Composition) to ensure
    // Unicode characters are in a consistent form. This is critical for reliable pattern matching
    // with Cyrillic characters, as some characters (e.g., 'і', 'ї') can be represented in multiple
    // Unicode forms (composed vs. decomposed), which would cause regex patterns to fail.
    const normalizedWord = word.normalize('NFC');

    const [matchingRule] = await this.findMatchingRules(normalizedWord, params);
    if (matchingRule == null) {
      return normalizedWord;
    }

    return new DeclensionRuleInflector(matchingRule).inflect(
      normalizedWord,
      params.grammaticalCase,
    );
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
