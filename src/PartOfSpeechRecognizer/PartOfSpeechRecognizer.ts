import RecognizerRule from './RecognizerRule';
import Gender from '../Core/Gender';
import PartOfSpeech from './PartOfSpeech';
import WordTransformer from './WordTransformer';

export default class PartOfSpeechRecognizer {
  private readonly rules: RecognizerRule[];

  constructor(rules: RecognizerRule[]) {
    this.rules = rules;
  }

  /**
   * Recognizes the part of speech of a given word.
   * Returns part of speech of a given word.
   * Returns null if part of speech was not recognized.
   */
  recognize(word: string, gender: Gender): PartOfSpeech | null {
    const transformedWord = new WordTransformer().transform(word);
    const rule = this.rules.find(rule => rule.condition(transformedWord, gender));
    if (!rule) {
      return null;
    }
    return rule.apply(transformedWord);
  }
}
