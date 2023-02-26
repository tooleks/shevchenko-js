import { GrammaticalCase, GrammaticalGender } from '../language';
import { Anthroponym } from './anthroponym';
import { FamilyNameInflector } from './family-name-inflector';
import { GivenNameInflector } from './given-name-inflector';
import { PatronymicNameInflector } from './patronymic-name-inflector';

export class AnthroponymInflector {
  private readonly givenNameInflector: GivenNameInflector;
  private readonly patronymicNameInflector: PatronymicNameInflector;
  private readonly familyNameInflector: FamilyNameInflector;

  constructor(
    givenNameInflector: GivenNameInflector,
    patronymicNameInflector: PatronymicNameInflector,
    familyNameInflector: FamilyNameInflector,
  ) {
    this.givenNameInflector = givenNameInflector;
    this.patronymicNameInflector = patronymicNameInflector;
    this.familyNameInflector = familyNameInflector;
  }

  /**
   * Inflects the anthroponym in the given grammatical case.
   */
  async inflect(
    anthroponym: Anthroponym,
    gender: GrammaticalGender,
    grammaticalCase: GrammaticalCase,
  ): Promise<Anthroponym> {
    const inflectedAnthroponym: Anthroponym = {};

    if (anthroponym.givenName != null) {
      inflectedAnthroponym.givenName = await this.givenNameInflector.inflect(
        anthroponym.givenName,
        gender,
        grammaticalCase,
      );
    }

    if (anthroponym.patronymicName != null) {
      inflectedAnthroponym.patronymicName = await this.patronymicNameInflector.inflect(
        anthroponym.patronymicName,
        gender,
        grammaticalCase,
      );
    }

    if (anthroponym.familyName != null) {
      inflectedAnthroponym.familyName = await this.familyNameInflector.inflect(
        anthroponym.familyName,
        gender,
        grammaticalCase,
      );
    }

    return inflectedAnthroponym;
  }
}
