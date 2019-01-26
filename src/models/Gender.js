import validate from './validate';

/**
 * Gender values.
 *
 * @readonly
 * @type {object}
 */
export const GENDERS = Object.freeze({
  MALE: 'male',
  FEMALE: 'female',
});

export default class Gender {
  /**
   * @param {string} gender
   */
  constructor(gender) {
    validate.genderValue(gender);
    this._gender = gender;
    this.toString = this.toString.bind(this);
    this.isMale = this.isMale.bind(this);
    this.isFemale = this.isFemale.bind(this);
  }

  /**
   * @return {string}
   */
  toString() {
    return this._gender;
  }

  /**
   * Determine whether gender value is male.
   *
   * @return {boolean}
   */
  isMale() {
    return this.toString() === GENDERS.MALE;
  }

  /**
   * Determine whether gender value is female.
   *
   * @return {boolean}
   */
  isFemale() {
    return this.toString() === GENDERS.FEMALE;
  }
}
