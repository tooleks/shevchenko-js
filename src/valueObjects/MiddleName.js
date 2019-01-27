import AbstractName from './AbstractName';

export default class MiddleName extends AbstractName {
  /**
   * @param {string} middleName
   */
  static validate(middleName) {
    if (typeof middleName !== 'string') {
      throw new TypeError('Invalid middle name type. Allowed types: string.');
    }
  }

  /**
   * @param {string} middleName
   */
  constructor(middleName) {
    super();
    MiddleName.validate(middleName);
    this._middleName = middleName;
    this.toString = this.toString.bind(this);
  }

  /**
   * @return {string}
   */
  toString() {
    return this._middleName;
  }
}
