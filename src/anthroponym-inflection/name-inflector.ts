import { Gender, GrammaticalCase } from '../core';

export abstract class NameInflector {
  /**
   * Inflects a given name in a given grammatical case.
   */
  inflect(name: string, gender: Gender, grammaticalCase: GrammaticalCase): string {
    const words = name.split('-');
    return words
      .map((word, wordIndex) => this.inflectWord(word, gender, grammaticalCase, wordIndex === words.length - 1))
      .join('-');
  }

  /**
   * Inflects a given word of the compound name in a given grammatical case.
   */
  // tslint:disable-next-line max-line-length
  protected abstract inflectWord(word: string, gender: Gender, grammaticalCase: GrammaticalCase, isLastWord: boolean): string;
}
