import AbstractName from './AbstractName';
import validate from './validate';

export default class LastName extends AbstractName {
  /**
   * @param {string} lastName
   */
  constructor(lastName) {
    super();
    validate.lastNameValue(lastName);
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
