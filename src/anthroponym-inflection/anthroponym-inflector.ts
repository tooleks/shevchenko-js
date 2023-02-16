import { Gender, GrammaticalCase } from '../language';
import { Anthroponym } from './anthroponym';
import { FirstNameInflector } from './first-name-inflector';
import { LastNameInflector } from './last-name-inflector';
import { MiddleNameInflector } from './middle-name-inflector';

export class AnthroponymInflector {
  private readonly firstNameInflector: FirstNameInflector;
  private readonly middleNameInflector: MiddleNameInflector;
  private readonly lastNameInflector: LastNameInflector;

  constructor(
    firstNameInflector: FirstNameInflector,
    middleNameInflector: MiddleNameInflector,
    lastNameInflector: LastNameInflector,
  ) {
    this.firstNameInflector = firstNameInflector;
    this.middleNameInflector = middleNameInflector;
    this.lastNameInflector = lastNameInflector;
  }

  /**
   * Inflects the anthroponym in the given grammatical case.
   */
  async inflect(
    anthroponym: Anthroponym,
    gender: Gender,
    grammaticalCase: GrammaticalCase,
  ): Promise<Anthroponym> {
    const result: Anthroponym = {};

    if (anthroponym.firstName != null) {
      result.firstName = await this.firstNameInflector.inflect(
        anthroponym.firstName,
        gender,
        grammaticalCase,
      );
    }

    if (anthroponym.middleName != null) {
      result.middleName = await this.middleNameInflector.inflect(
        anthroponym.middleName,
        gender,
        grammaticalCase,
      );
    }

    if (anthroponym.lastName != null) {
      result.lastName = await this.lastNameInflector.inflect(
        anthroponym.lastName,
        gender,
        grammaticalCase,
      );
    }

    return result;
  }
}
