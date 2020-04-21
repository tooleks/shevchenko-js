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
  protected inflectName(lastName: string, gender: Gender, grammaticalCase: GrammaticalCase, last: boolean): string {
    if (!last && LangUtils.countVowels(lastName) === 1) {
      return lastName;
    }

    const [rule] = this.rules
      .filter(rule => rule.gender.includes(gender))
      .filter(rule => rule.usage.length === 0 || rule.usage.includes('lastName'))
      .filter(rule => new RegExp(rule.pattern.find, 'gi').test(lastName))
      .filter(rule => {
        const partOfSpeech = this.partOfSpeechRecognizer.recognize(lastName, gender);
        return rule.partOfSpeech === partOfSpeech || partOfSpeech == null;
      })
      .sort((firstRule, secondRule) => {
        if (firstRule.usage.length === 0 && secondRule.usage.length > 0 && secondRule.usage.includes('lastName')) {
          return 1;
        }
        return 0;
      });

    if (rule == null) {
      return lastName;
    }

    return new RuleInflector(rule).inflect(lastName, grammaticalCase);
  }
}
