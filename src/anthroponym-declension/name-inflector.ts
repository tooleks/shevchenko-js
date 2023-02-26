import { GrammaticalCase, GrammaticalGender } from '../language';

export abstract class NameInflector {
  /**
   * Inflects the name in the given grammatical case.
   */
  async inflect(
    name: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
  ): Promise<string> {
    const inflectedNameParts: string[] = [];

    const nameParts = name.split('-');
    for (let index = 0; index < nameParts.length; index += 1) {
      const inflectedNamePart = await this.inflectNamePart(
        nameParts[index],
        gender,
        grammaticalCase,
        index === nameParts.length - 1,
      );

      inflectedNameParts.push(inflectedNamePart);
    }

    return inflectedNameParts.join('-');
  }

  /**
   * Inflects a single name part of the compound name in a given grammatical case.
   */
  protected abstract inflectNamePart(
    word: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
    isLastWord: boolean,
  ): Promise<string>;
}
