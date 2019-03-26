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
    this.constructor.validate(anthroponym);

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
   * @returns {object}
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
   * @returns {boolean}
   */
  hasFirstName() {
    return this._firstName != null;
  }

  /**
   * Determine whether the anthroponym has middle name.
   *
   * @returns {boolean}
   */
  hasMiddleName() {
    return this._middleName != null;
  }

  /**
   * Determine whether the anthroponym has last name.
   *
   * @returns {boolean}
   */
  hasLastName() {
    return this._lastName != null;
  }

  /**
   * Get first name.
   *
   * @returns {FirstName|null}
   */
  getFirstName() {
    return this._firstName || null;
  }

  /**
   * Get middle name.
   *
   * @returns {MiddleName|null}
   */
  getMiddleName() {
    return this._middleName || null;
  }

  /**
   * Get last name.
   *
   * @returns {LastName|null}
   */
  getLastName() {
    return this._lastName || null;
  }

  /**
   * Get gender.
   *
   * @returns {Gender}
   */
  getGender() {
    return this._gender;
  }
}
