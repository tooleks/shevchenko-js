import Anthroponym from '../Core/Anthroponym';
import GrammaticalCase from '../Core/GrammaticalCase';
import FirstNameInflector from './FirstNameInflector';
import MiddleNameInflector from './MiddleNameInflector';
import LastNameInflector from './LastNameInflector';

export default class AnthroponymInflector {
  private readonly firstNameInflector: FirstNameInflector;
  private readonly middleNameInflector: MiddleNameInflector;
  private readonly lastNameInflector: LastNameInflector;

  // tslint:disable-next-line max-line-length
  constructor(firstNameInflector: FirstNameInflector, middleNameInflector: MiddleNameInflector, lastNameInflector: LastNameInflector) {
    this.firstNameInflector = firstNameInflector;
    this.middleNameInflector = middleNameInflector;
    this.lastNameInflector = lastNameInflector;
  }

  /**
   * Inflects a given anthroponym in a given grammatical case.
   */
  inflect(anthroponym: Anthroponym, grammaticalCase: GrammaticalCase): Anthroponym {
    const result = { gender: anthroponym.gender } as Anthroponym;

    if (anthroponym.firstName != null) {
      result.firstName = this.firstNameInflector.inflect(anthroponym.firstName, anthroponym.gender, grammaticalCase);
    }

    if (anthroponym.middleName != null) {
      result.middleName = this.middleNameInflector.inflect(anthroponym.middleName, anthroponym.gender, grammaticalCase);
    }

    if (anthroponym.lastName != null) {
      result.lastName = this.lastNameInflector.inflect(anthroponym.lastName, anthroponym.gender, grammaticalCase);
    }

    return result;
  }
}
