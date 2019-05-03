import AbstractName from './AbstractName';

export default class FirstName extends AbstractName {
  /**
   * @param {string} firstName
   */
  static validate(firstName) {
    if (typeof firstName !== 'string') {
      throw new TypeError('Invalid first name type. Allowed types: string.');
    }
  }

  /**
   * @param {string} firstName
   */
  constructor(firstName) {
    super();
    this.constructor.validate(firstName);
    this._firstName = firstName;
  }

  /**
   * @returns {string}
   */
  toString() {
    return this._firstName;
  }
}
