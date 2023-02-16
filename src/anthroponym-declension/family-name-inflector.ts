import { countSyllables, GrammaticalCase, GrammaticalGender } from '../language';
import { WordClassRecognizer } from '../word-class-recognition';
import { DeclensionRule, DeclensionRuleInflector } from '../word-declension';
import { NameInflector } from './name-inflector';

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
  protected async inflectWord(
    word: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
    isLastWord: boolean,
  ): Promise<string> {
    if (!isLastWord && countSyllables(word) === 1) {
      return word;
    }

    const rules = this.rules
      .filter((rule) => rule.gender.includes(gender))
      .filter((rule) => rule.application.length === 0 || rule.application.includes('lastName'))
      .filter((rule) => new RegExp(rule.pattern.find, 'gi').test(word));

    const mathingRules: DeclensionRule[] = [];
    for (const rule of rules) {
      if (
        (gender === GrammaticalGender.FEMININE && /[ая]$/i.test(word)) ||
        (gender === GrammaticalGender.MASCULINE && /(ой|ий|ій|их)$/i.test(word))
      ) {
        const wordClass = await this.wordClassRecognizer.recognize(word);
        if (wordClass === rule.wordClass) {
          mathingRules.push(rule);
        }
      } else {
        mathingRules.push(rule);
      }
    }

    const [rule] = mathingRules.sort((firstRule, secondRule) => {
      if (firstRule.application.length === 0) {
        return 0;
      }
      if (secondRule.application.length > 0) {
        return 0;
      }
      if (secondRule.application.includes('lastName')) {
        return 0;
      }
      return 1;
    });

    if (!rule) {
      return word;
    }

    return new DeclensionRuleInflector(rule).inflect(word, grammaticalCase);
  }
}
