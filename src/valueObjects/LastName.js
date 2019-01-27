import AbstractName from './AbstractName';

export default class LastName extends AbstractName {
  /**
   * @param {string} lastName
   */
  static validate(lastName) {
    if (typeof lastName !== 'string') {
      throw new TypeError('Invalid last name type. Allowed types: string.');
    }
  }

  /**
   * @param {string} lastName
   */
  constructor(lastName) {
    super();
    LastName.validate(lastName);
    this._lastName = lastName;
    this.toString = this.toString.bind(this);
  }

  /**
   * @return {string}
   */
  toString() {
    return this._lastName;
  }
}