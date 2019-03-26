/**
 * Inflection case values.
 *
 * @readonly
 * @type {object}
 */
export const INFLECTION_CASES = Object.freeze({
  NOMINATIVE: 'nominative',
  GENITIVE: 'genitive',
  DATIVE: 'dative',
  ACCUSATIVE: 'accusative',
  ABLATIVE: 'ablative',
  LOCATIVE: 'locative',
  VOCATIVE: 'vocative',
});

export default class InflectionCase {
  /**
   * @param {string} inflectionCase
   */
  static validate(inflectionCase) {
    if (!Object.values(INFLECTION_CASES).includes(inflectionCase)) {
      const allowedValues = Object.values(INFLECTION_CASES).join(', ');
      throw new TypeError(`Invalid inflection case value. Allowed values: ${allowedValues}.`);
    }
  }

  /**
   * @param {string} inflectionCase
   */
  constructor(inflectionCase) {
    this.constructor.validate(inflectionCase);
    this._inflectionCase = inflectionCase;
    this.toString = this.toString.bind(this);
  }

  /**
   * @returns {string}
   */
  toString() {
    return this._inflectionCase;
  }
}
