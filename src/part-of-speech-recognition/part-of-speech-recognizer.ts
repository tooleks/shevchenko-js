import { PartOfSpeechRecognitionRule } from './part-of-speech-recognition-rule';
import { Gender } from '../core';
import { PartOfSpeech } from './part-of-speech.enum';
import { WordTransformer } from './word-transformer';

export class PartOfSpeechRecognizer {
  private readonly rules: PartOfSpeechRecognitionRule[];

  constructor(rules: PartOfSpeechRecognitionRule[]) {
    this.rules = rules;
  }

  /**
   * Recognizes the part of speech of a given word.
   * Returns part of speech of a given word.
   * Returns null if part of speech was not recognized.
   */
  recognize(word: string, gender: Gender): PartOfSpeech | null {
    const transformedWord = new WordTransformer().transform(word);
    const rule = this.rules.find(rule => rule.guard(transformedWord, gender));
    if (!rule) {
      return null;
    }
    return rule.apply(transformedWord);
  }
}
