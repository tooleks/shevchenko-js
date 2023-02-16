import { Anthroponym } from '../core';
import { GrammaticalCase } from '../language';
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
  async inflect(anthroponym: Anthroponym, grammaticalCase: GrammaticalCase): Promise<Anthroponym> {
    const result: Anthroponym = { gender: anthroponym.gender };

    if (anthroponym.firstName != null) {
      result.firstName = await this.firstNameInflector.inflect(
        anthroponym.firstName,
        anthroponym.gender,
        grammaticalCase,
      );
    }

    if (anthroponym.middleName != null) {
      result.middleName = await this.middleNameInflector.inflect(
        anthroponym.middleName,
        anthroponym.gender,
        grammaticalCase,
      );
    }

    if (anthroponym.lastName != null) {
      result.lastName = await this.lastNameInflector.inflect(
        anthroponym.lastName,
        anthroponym.gender,
        grammaticalCase,
      );
    }

    return result;
  }
}
