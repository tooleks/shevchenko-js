export default class AnthroponymInflector {
  /**
   * @param {FirstNameInflector} firstNameInflector
   * @param {MiddleNameInflector} middleNameInflector
   * @param {LastNameInflector} lastNameInflector
   */
  constructor(firstNameInflector, middleNameInflector, lastNameInflector) {
    this.firstNameInflector = firstNameInflector;
    this.middleNameInflector = middleNameInflector;
    this.lastNameInflector = lastNameInflector;
  }

  /**
   * Inflects the anthroponym first, last and middle names.
   *
   * @param {object} anthroponym
   * @param {INFLECTION_CASE} inflectionCase
   * @returns {object}
   */
  inflect(anthroponym, inflectionCase) {
    const result = {};

    if (anthroponym.firstName != null) {
      result.firstName = this.firstNameInflector.inflect(anthroponym.firstName, anthroponym.gender, inflectionCase);
    }

    if (anthroponym.middleName != null) {
      result.middleName = this.middleNameInflector.inflect(anthroponym.middleName, anthroponym.gender, inflectionCase);
    }

    if (anthroponym.lastName != null) {
      result.lastName = this.lastNameInflector.inflect(anthroponym.lastName, anthroponym.gender, inflectionCase);
    }

    return result;
  }
}
