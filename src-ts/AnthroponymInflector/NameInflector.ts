import GrammaticalCase from '../Core/GrammaticalCase';
import Gender from '../Core/Gender';

export default abstract class NameInflector {
  /**
   * Inflects a given name in a given grammatical case.
   */
  inflect(name: string, gender: Gender, grammaticalCase: GrammaticalCase): string {
    const words = name.split('-');
    return words
      .map((word, wordIndex) => this.inflectName(word, gender, grammaticalCase, wordIndex === words.length - 1))
      .join('-');
  }

  /**
   * Inflects a given part of the name in a given grammatical case.
   */
  protected abstract inflectName(word: string, gender: Gender, grammaticalCase: GrammaticalCase, wordIndex: boolean): string;
}
