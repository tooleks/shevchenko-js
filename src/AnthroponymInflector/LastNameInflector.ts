import InflectorRule from './InflectorRule';
import Gender from '../Core/Gender';
import GrammaticalCase from '../Core/GrammaticalCase';
import PartOfSpeechRecognizer from '../PartOfSpeechRecognizer/PartOfSpeechRecognizer';
import * as LangUtils from '../Utils/LangUtils';
import NameInflector from './NameInflector';
import RuleInflector from './RuleInflector';

export default class LastNameInflector extends NameInflector {
  private readonly rules: InflectorRule[];
  private readonly partOfSpeechRecognizer: PartOfSpeechRecognizer;

  constructor(rules: InflectorRule[], partOfSpeechRecognizer: PartOfSpeechRecognizer) {
    super();
    this.rules = rules;
    this.partOfSpeechRecognizer = partOfSpeechRecognizer;
  }

  /**
   * @inheritdoc
   */
  // tslint:disable-next-line max-line-length
  protected inflectName(lastName: string, gender: Gender, grammaticalCase: GrammaticalCase, isLastWord: boolean): string {
    if (!isLastWord && LangUtils.countVowels(lastName) === 1) {
      return lastName;
    }

    const [rule] = this.rules
      .filter(rule => rule.gender.includes(gender))
      .filter(rule => rule.usage.length === 0 || rule.usage.includes('lastName'))
      .filter(rule => new RegExp(rule.pattern.find, 'gi').test(lastName))
      .filter((rule) => {
        const partOfSpeech = this.partOfSpeechRecognizer.recognize(lastName, gender);
        return rule.partOfSpeech === partOfSpeech || partOfSpeech == null;
      })
      .sort((firstRule, secondRule) => {
        if (firstRule.usage.length === 0) {
          return 0;
        }
        if (secondRule.usage.length > 0) {
          return 0;
        }
        if (secondRule.usage.includes('firstName')) {
          return 0;
        }
        return 1;
      });

    if (rule == null) {
      return lastName;
    }

    return new RuleInflector(rule).inflect(lastName, grammaticalCase);
  }
}
