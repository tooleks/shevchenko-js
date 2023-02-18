import { GrammaticalCase, GrammaticalGender, isMonosyllable } from '../language';
import { WordClassRecognizer } from '../word-class-recognition';
import {
  DeclensionRule,
  DeclensionRuleInflector,
  isApplicable,
  isGenderApplicable,
  isWordApplicable,
} from '../word-declension';
import { NameInflector } from './name-inflector';

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

const UNKNOWN_FEMININE_WORD_CLASS_PATTERN = /[ая]$/i;
const UNKNOWN_MASCULINE_WORD_CLASS_PATTERN = /(ой|ий|ій|их)$/i;

export class FamilyNameInflector extends NameInflector {
  private readonly rules: DeclensionRule[];
  private readonly wordClassRecognizer: WordClassRecognizer;

  constructor(rules: DeclensionRule[], wordClassRecognizer: WordClassRecognizer) {
    super();
    this.rules = rules;
    this.wordClassRecognizer = wordClassRecognizer;
  }

  /**
   * @inheritdoc
   */
  protected async inflectNamePart(
    familyName: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
    isLastWord: boolean,
  ): Promise<string> {
    if (!isLastWord && isMonosyllable(familyName)) {
      return familyName;
    }

    const matchedRules = this.rules
      .filter((rule) => isGenderApplicable(rule, gender))
      .filter((rule) => isApplicable(rule, 'familyName'))
      .filter((rule) => isWordApplicable(rule, familyName));

    const [rule] = await filterAsync(matchedRules, async (rule) => {
      const uknownWordClass =
        (gender === GrammaticalGender.FEMININE &&
          UNKNOWN_FEMININE_WORD_CLASS_PATTERN.test(familyName)) ||
        (gender === GrammaticalGender.MASCULINE &&
          UNKNOWN_MASCULINE_WORD_CLASS_PATTERN.test(familyName));

      if (uknownWordClass) {
        const wordClass = await this.wordClassRecognizer.recognize(familyName);
        return wordClass === rule.wordClass;
      }

      return true;
    });

    if (rule == null) {
      return familyName;
    }

    return new DeclensionRuleInflector(rule).inflect(familyName, grammaticalCase);
  }
}
