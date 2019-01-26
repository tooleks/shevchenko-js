import validate from './validate';

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
  constructor(inflectionCase) {
    validate.inflectionCaseValue(inflectionCase);
    this._inflectionCase = inflectionCase;
    this.toString = this.toString.bind(this);
  }

  /**
   * @return {string}
   */
  toString() {
    return this._inflectionCase;
  }
}
