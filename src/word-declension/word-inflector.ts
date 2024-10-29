import { GrammaticalCase, GrammaticalGender, WordClass } from '../language';
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

export interface WordInflector {
  /**
   * Inflects a given word according to the specified parameters.
   */
  inflect(word: string, params: DeclensionParams): Promise<string>;
}
