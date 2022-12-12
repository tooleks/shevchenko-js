import { Gender, GrammaticalCase } from '../core';

export abstract class NameInflector {
  /**
   * Inflects the name in the given grammatical case.
   */
  async inflect(name: string, gender: Gender, grammaticalCase: GrammaticalCase): Promise<string> {
    const results: string[] = [];

    const words = name.split('-');
    for (let index = 0; index < words.length; index += 1) {
      const result = await this.inflectWord(
        words[index],
        gender,
        grammaticalCase,
        index === words.length - 1,
      );
      results.push(result);
    }

    return results.join('-');
  }

  /**
   * Inflects the word of the compound name in the given grammatical case.
   */
  protected abstract inflectWord(
    word: string,
    gender: Gender,
    grammaticalCase: GrammaticalCase,
    isLastWord: boolean,
  ): Promise<string> | string;
}
