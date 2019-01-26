import AbstractName from './AbstractName';
import validate from './validate';

export default class FirstName extends AbstractName {
  /**
   * @param {string} firstName
   */
  constructor(firstName) {
    super();
    validate.firstNameValue(firstName);
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
