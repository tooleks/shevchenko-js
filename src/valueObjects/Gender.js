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
    this.constructor.validate(gender);
    this._gender = gender;
  }

  /**
   * @returns {string}
   */
  toString() {
    return this._gender;
  }

  /**
   * Determines whether gender value is male.
   *
   * @returns {boolean}
   */
  isMale() {
    return this._gender === GENDERS.MALE;
  }

  /**
   * Determines whether gender value is female.
   *
   * @returns {boolean}
   */
  isFemale() {
    return this._gender === GENDERS.FEMALE;
  }
}
