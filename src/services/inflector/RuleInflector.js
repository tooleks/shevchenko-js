import * as stringUtil from '../util/stringUtil';
import * as regExpUtil from '../util/regExpUtil';

export default class RuleInflector {
  /**
   * Get an inflection rule modifier functions.
   *
   * @returns {object}
   * @private
   */
  static getRuleModifiers() {
    return Object.freeze({
      append: (value, modifierValue) => value + modifierValue,
      replace: (value, modifierValue) => modifierValue,
    });
  }

  /**
   * Apply the inflection rule modifier to the value.
   *
   * @param {object} modifier
   * @param {string} modifier.type
   * @param {string} modifier.value
   * @param {string} value
   * @returns {*}
   * @private
   */
  static applyRuleModifier(modifier, value) {
    if (typeof modifier === 'object') {
      const modify = this.getRuleModifiers()[modifier.type];
      if (typeof modify === 'function') {
        return modify(value, modifier.value);
      }
    }
    return value;
  }

  /**
   */
  constructor() {
    this.inflect = this.inflect.bind(this);
  }

  /**
   * Inflect a word by the inflection rule.
   *
   * @param {string} word
   * @param {InflectionCase} inflectionCase
   * @param {object} rule
   * @param {object} rule.regexp
   * @param {string} rule.regexp.modify
   * @param {string} rule.inflectionCases
   * @returns {string}
   */
  inflect(word, inflectionCase, rule) {
    const regExp = rule.regexp.modify;
    const [modifiers] = rule.inflectionCases[inflectionCase.toString()];
    if (typeof modifiers === 'object') {
      const searchValue = new RegExp(regExp, 'gm');
      const inflectedWord = word.toLowerCase().replace(searchValue, (match, ...groups) => {
        let replacer = '';
        const maxIndex = regExpUtil.countGroups(regExp);
        for (let index = 0; index < maxIndex; index++) {
          replacer += RuleInflector.applyRuleModifier(modifiers[index], groups[index]);
        }
        return replacer;
      });
      return stringUtil.applyCaseMask(inflectedWord, word);
    }
    return word;
  }
}
