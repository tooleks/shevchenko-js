import AbstractName from './AbstractName';
import validate from './validate';

export default class MiddleName extends AbstractName {
  /**
   * @param {string} middleName
   */
  constructor(middleName) {
    super();
    validate.middleNameValue(middleName);
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
