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
    FirstName.validate(firstName);
    this._firstName = firstName;
    this.toString = this.toString.bind(this);
  }

  /**
   * @return {string}
   */
  toString() {
    return this._firstName;
  }
}
