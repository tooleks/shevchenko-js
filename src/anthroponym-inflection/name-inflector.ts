import { Gender, GrammaticalCase } from '../core';

export abstract class NameInflector {
  /**
   * Inflects the name in the given grammatical case.
   */
  inflect(name: string, gender: Gender, grammaticalCase: GrammaticalCase): string {
    const words = name.split('-');
    return words
      .map((word, wordIndex) => this.inflectWord(word, gender, grammaticalCase, wordIndex === words.length - 1))
      .join('-');
  }

  /**
   * Inflects the word of the compound name in the given grammatical case.
   */
  // tslint:disable-next-line max-line-length
  protected abstract inflectWord(word: string, gender: Gender, grammaticalCase: GrammaticalCase, isLastWord: boolean): string;
}
