import Anthroponym from '../../valueObjects/Anthroponym';

export default class AnthroponymInflector {
  /**
   * @param {FirstNameInflector} firstNameInflector
   * @param {MiddleNameInflector} middleNameInflector
   * @param {LastNameInflector} lastNameInflector
   */
  constructor(firstNameInflector, middleNameInflector, lastNameInflector) {
    this._firstNameInflector = firstNameInflector;
    this._middleNameInflector = middleNameInflector;
    this._lastNameInflector = lastNameInflector;
  }

  /**
   * Inflects the anthroponym first, last and middle names.
   *
   * @param {Anthroponym} anthroponym
   * @param {InflectionCase} inflectionCase
   * @returns {Anthroponym}
   */
  inflect(anthroponym, inflectionCase) {
    const attributes = {};

    if (anthroponym.hasFirstName()) {
      attributes.firstName = this._firstNameInflector
        .inflect(anthroponym.getFirstName(), anthroponym.getGender(), inflectionCase)
        .toString();
    }

    if (anthroponym.hasMiddleName()) {
      attributes.middleName = this._middleNameInflector
        .inflect(anthroponym.getMiddleName(), anthroponym.getGender(), inflectionCase)
        .toString();
    }

    if (anthroponym.hasLastName()) {
      attributes.lastName = this._lastNameInflector
        .inflect(anthroponym.getLastName(), anthroponym.getGender(), inflectionCase)
        .toString();
    }

    return new Anthroponym({ ...attributes, gender: anthroponym.getGender().toString() });
  }
}
