import { GrammaticalCase, GrammaticalGender } from '../language';
import { WordInflector } from '../word-declension';
import { NameInflector } from './name-inflector';

export class GivenNameInflector extends NameInflector {
  private readonly wordInflector: WordInflector;

  constructor(wordInflector: WordInflector) {
    super();
    this.wordInflector = wordInflector;
  }

  /**
   * @inheritdoc
   */
  protected inflectNamePart(
    givenName: string,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
  ): Promise<string> {
    return this.wordInflector.inflect(givenName, {
      grammaticalCase: grammaticalCase,
      gender: gender,
      application: 'givenName',
    });
  }
}
