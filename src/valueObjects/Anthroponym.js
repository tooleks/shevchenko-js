import Gender from './Gender';
import FirstName from './FirstName';
import MiddleName from './MiddleName';
import LastName from './LastName';

export default class Anthroponym {
  /**
   * @param {Object} anthroponym
   */
  static validate(anthroponym) {
    if (typeof anthroponym !== 'object' || anthroponym == null) {
      throw new TypeError('Invalid anthroponym type. Allowed types: object.');
    }

    const hasFirstName = Object.prototype.hasOwnProperty.call(anthroponym, 'firstName');
    const hasMiddleName = Object.prototype.hasOwnProperty.call(anthroponym, 'middleName');
    const hasLastName = Object.prototype.hasOwnProperty.call(anthroponym, 'lastName');
    if (!hasFirstName && !hasMiddleName && !hasLastName) {
      throw new TypeError('Invalid anthroponym value.');
    }

    Gender.validate(anthroponym.gender);

    if (hasFirstName) {
      FirstName.validate(anthroponym.firstName);
    }

    if (hasMiddleName) {
      MiddleName.validate(anthroponym.middleName);
    }

    if (hasLastName) {
      LastName.validate(anthroponym.lastName);
    }
  }

  /**
   * @param {object} anthroponym
   */
  constructor(anthroponym) {
    Anthroponym.validate(anthroponym);

    this._gender = new Gender(anthroponym.gender);
    if (Object.prototype.hasOwnProperty.call(anthroponym, 'firstName')) {
      this._firstName = new FirstName(anthroponym.firstName);
    }
    if (Object.prototype.hasOwnProperty.call(anthroponym, 'middleName')) {
      this._middleName = new MiddleName(anthroponym.middleName);
    }
    if (Object.prototype.hasOwnProperty.call(anthroponym, 'lastName')) {
      this._lastName = new LastName(anthroponym.lastName);
    }

    this.toObject = this.toObject.bind(this);
    this.hasFirstName = this.hasFirstName.bind(this);
    this.hasMiddleName = this.hasMiddleName.bind(this);
    this.hasLastName = this.hasLastName.bind(this);
    this.getFirstName = this.getFirstName.bind(this);
    this.getMiddleName = this.getMiddleName.bind(this);
    this.getLastName = this.getLastName.bind(this);
    this.getGender = this.getGender.bind(this);
  }

  /**
   * Cast the value to an object.
   *
   * @return {object}
   */
  toObject() {
    const object = {};
    object.gender = this._gender.toString();
    if (this.hasFirstName()) {
      object.firstName = this._firstName.toString();
    }
    if (this.hasMiddleName()) {
      object.middleName = this._middleName.toString();
    }
    if (this.hasLastName()) {
      object.lastName = this._lastName.toString();
    }
    return object;
  }

  /**
   * Determine whether the anthroponym has first name.
   *
   * @return {boolean}
   */
  hasFirstName() {
    return Boolean(this._firstName);
  }

  /**
   * Determine whether the anthroponym has middle name.
   *
   * @return {boolean}
   */
  hasMiddleName() {
    return Boolean(this._middleName);
  }

  /**
   * Determine whether the anthroponym has last name.
   *
   * @return {boolean}
   */
  hasLastName() {
    return Boolean(this._lastName);
  }

  /**
   * Get first name.
   *
   * @return {FirstName|null}
   */
  getFirstName() {
    return this._firstName || null;
  }

  /**
   * Get middle name.
   *
   * @return {MiddleName|null}
   */
  getMiddleName() {
    return this._middleName || null;
  }

  /**
   * Get last name.
   *
   * @return {LastName|null}
   */
  getLastName() {
    return this._lastName || null;
  }

  /**
   * Get gender.
   *
   * @return {Gender}
   */
  getGender() {
    return this._gender;
  }
}
