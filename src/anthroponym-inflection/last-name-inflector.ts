import { Gender, GrammaticalCase } from '../core';
import { countVowels } from '../utils/lang.utils';
import { WordClassRecognizer } from '../word-class-recognition';
import { InflectorRule } from './inflector.types';
import { NameInflector } from './name-inflector';
import { RuleInflector } from './rule-inflector';

export class LastNameInflector extends NameInflector {
  private readonly rules: InflectorRule[];
  private readonly wordClassRecognizer: WordClassRecognizer;

  constructor(rules: InflectorRule[], wordClassRecognizer: WordClassRecognizer) {
    super();
    this.rules = rules;
    this.wordClassRecognizer = wordClassRecognizer;
  }

  /**
   * @inheritdoc
   */
  protected async inflectWord(
    word: string,
    gender: Gender,
    grammaticalCase: GrammaticalCase,
    isLastWord: boolean,
  ): Promise<string> {
    if (!isLastWord && countVowels(word) === 1) {
      return word;
    }

    const rules = this.rules
      .filter((rule) => rule.gender.includes(gender))
      .filter((rule) => rule.usage.length === 0 || rule.usage.includes('lastName'))
      .filter((rule) => new RegExp(rule.pattern.find, 'gi').test(word));

    const mathingRules: InflectorRule[] = [];
    for (const rule of rules) {
      if (
        (gender === Gender.Female && /[ая]$/i.test(word)) ||
        (gender === Gender.Male && /(ой|ий|ій|их)$/i.test(word))
      ) {
        const wordClass = await this.wordClassRecognizer.recognize(word);
        if (wordClass === rule.partOfSpeech) {
          mathingRules.push(rule);
        }
      } else {
        mathingRules.push(rule);
      }
    }

    const [rule] = mathingRules.sort((firstRule, secondRule) => {
      if (firstRule.usage.length === 0) {
        return 0;
      }
      if (secondRule.usage.length > 0) {
        return 0;
      }
      if (secondRule.usage.includes('lastName')) {
        return 0;
      }
      return 1;
    });

    if (!rule) {
      return word;
    }

    return new RuleInflector(rule).inflect(word, grammaticalCase);
  }
}
