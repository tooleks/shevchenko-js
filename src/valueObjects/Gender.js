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
  static validate(gender) {
    if (!Object.values(GENDERS).includes(gender)) {
      const allowedValues = Object.values(GENDERS).join(', ');
      throw new TypeError(`Invalid gender value. Allowed values: ${allowedValues}.`);
    }
  }

  /**
   * @param {string} gender
   */
  constructor(gender) {
    Gender.validate(gender);
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
    return this._gender === GENDERS.MALE;
  }

  /**
   * Determine whether gender value is female.
   *
   * @return {boolean}
   */
  isFemale() {
    return this._gender === GENDERS.FEMALE;
  }
}
