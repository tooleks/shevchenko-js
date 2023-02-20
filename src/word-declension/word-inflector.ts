import { GrammaticalCase, GrammaticalGender } from '../language';
import { DeclensionRuleInflector } from './declension-rule-inflector';
import { DeclensionRule } from './declension-types';

/**
 * Returns a new array with all elements that pass the async test implemented by the provided function.
 */
async function filterAsync<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
  const results = await Promise.all(array.map(predicate));
  return array.filter((_v, index) => results[index]);
}

export type PipelineFilter = (
  declensionRule: DeclensionRule,
  index: number,
  declensionRules: DeclensionRule[],
) => Promise<boolean>;

export interface InflectParams {
  grammaticalCase: GrammaticalCase;
  gender: GrammaticalGender;
  application?: string;
  strict?: boolean;
  filter?: PipelineFilter;
}

export class WordInflector {
  private readonly declensionRules: DeclensionRule[];

  constructor(declensionRules: DeclensionRule[]) {
    this.declensionRules = declensionRules;
  }

  async inflect(word: string, params: InflectParams): Promise<string> {
    const matchedRules = this.declensionRules
      .filter((declensionRule) => {
        return declensionRule.gender.includes(params.gender);
      })
      .filter((rule) => {
        if (!params.application) {
          return true;
        }

        if (!params.strict) {
          return rule.application.length === 0 || rule.application.includes(params.application);
        }

        return rule.application.includes(params.application);
      })
      .filter((declensionRule) => {
        const wordPattern = new RegExp(declensionRule.pattern.find, 'gi');
        return wordPattern.test(word);
      });

    let [matchedRule] = matchedRules;
    if (params.filter) {
      [matchedRule] = await filterAsync(matchedRules, params.filter);
    }

    if (matchedRule == null) {
      return word;
    }

    return new DeclensionRuleInflector(matchedRule).inflect(word, params.grammaticalCase);
  }
}
