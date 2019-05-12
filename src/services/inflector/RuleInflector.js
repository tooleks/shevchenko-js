import * as stringUtil from "../../util/stringUtil";
import * as regExpUtil from "../../util/regExpUtil";

export default class RuleInflector {
  /**
   * Retrieves the inflection rule modifier functions.
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
   * Applies the inflection rule modifier to the value.
   *
   * @param {object} modifier
   * @param {string} modifier.type
   * @param {string} modifier.value
   * @param {string} value
   * @returns {string}
   * @private
   */
  static applyRuleModifier(modifier, value) {
    if (modifier != null) {
      const modify = this.getRuleModifiers()[modifier.type];
      if (modify != null) {
        return modify(value, modifier.value);
      }
    }
    return value;
  }

  /**
   * Inflects a word by the inflection rule.
   *
   * @param {string} word
   * @param {INFLECTION_CASE} inflectionCase
   * @param {object} rule
   * @param {object} rule.regexp
   * @param {string} rule.regexp.modify
   * @param {string} rule.inflectionCases
   * @returns {string}
   */
  inflect(word, inflectionCase, rule) {
    const regExp = rule.regexp.modify;
    const [modifiers] = rule.inflectionCases[inflectionCase];
    if (modifiers != null) {
      const inflectedWord = word.replace(new RegExp(regExp, "gmi"), (match, ...groups) => {
        let replacer = "";
        const maxIndex = regExpUtil.countGroups(regExp);
        for (let index = 0; index < maxIndex; index++) {
          replacer += this.constructor.applyRuleModifier(modifiers[index], groups[index]);
        }
        return replacer;
      });
      return stringUtil.applyCaseMask(word, inflectedWord);
    }
    return word;
  }
}
