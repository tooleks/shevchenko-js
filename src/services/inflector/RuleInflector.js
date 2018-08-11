import * as stringUtil from "../util/stringUtil";
import * as regExpUtil from "../util/regExpUtil";

export default class RuleInflector {
    /**
     * RuleInflector constructor.
     */
    constructor() {
        this._applyRuleModifier = this._applyRuleModifier.bind(this);
        this._getRuleModifiers = this._getRuleModifiers.bind(this);
        this.inflect = this.inflect.bind(this);
    }

    /**
     * Apply the inflection rule modifier to the value.
     *
     * @param {object} modifier
     * @param {string} modifier.type
     * @param {string} modifier.value
     * @param {string} value
     * @return {*}
     * @private
     */
    _applyRuleModifier(modifier, value) {
        if (typeof modifier === "object") {
            const modify = this._getRuleModifiers()[modifier.type];
            if (typeof modify === "function") {
                return modify(value, modifier.value);
            }
        }
        return value;
    }

    /**
     * Get an inflection rule modifier functions.
     *
     * @return {object}
     * @private
     */
    _getRuleModifiers() {
        return Object.freeze({
            append: (value, modifierValue) => value + modifierValue,
            replace: (value, modifierValue) => modifierValue,
        });
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
     * @return {string}
     */
    inflect(word, inflectionCase, rule) {
        const regExp = rule.regexp.modify;
        const [modifiers] = rule.inflectionCases[inflectionCase.valueOf()];
        if (typeof modifiers === "object") {
            const searchValue = new RegExp(regExp, "gm");
            const inflectedValue = word.toLowerCase().replace(searchValue, (match, ...groups) => {
                let replacer = "";
                const count = regExpUtil.countGroups(regExp);
                for (let index = 0; index < count; index++) {
                    replacer += this._applyRuleModifier(modifiers[index], groups[index]);
                }
                return replacer;
            });
            return stringUtil.applyCaseMask(word, inflectedValue);
        }
        return word;
    }
}
