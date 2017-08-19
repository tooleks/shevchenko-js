"use strict";

const Inflector = {};

/**
 * Inflect a value by inflection rule.
 *
 * @param {Object} rule
 * @param {string} caseName
 * @param {string} value
 * @returns {string}
 */
Inflector.inflectByRule = (rule, caseName, value) => {
    if (typeof rule === "undefined") return value;
    const regexp = rule.regexp.modify;
    const modifiers = rule.cases[caseName][0]; // Retrieve the first group modifiers object by case name.
    return value.replace(new RegExp(regexp, "gm"), (match, ...groups) => {
        let replacement = "";
        const count = Inflector.countRegexpGroups(regexp);
        let index = 0;
        while (index < count) {
            let modifier = typeof modifiers === "undefined" ? modifiers : modifiers[index];
            replacement += Inflector.applyGroupModifier(modifier, groups[index]);
            index++;
        }
        return replacement;
    });
};

/**
 * Apply a group modifier to the value.
 *
 * @see Inflector.inflectByRule
 *
 * @param {Object} modifier
 * @param {string} value
 * @returns {string}
 */
Inflector.applyGroupModifier = (modifier, value) => {
    if (typeof modifier === "undefined") return value;
    switch (modifier.type) {
        case "append":
            return value + modifier.value;
        case "replace":
            return modifier.value;
        default:
            return value;
    }
};

/**
 * Count a number of groups in regular expression string.
 *
 * @param {string} regexp
 * @returns {number}
 */
Inflector.countRegexpGroups = (regexp) => {
    return (new RegExp(regexp.toString() + "|")).exec("").length - 1;
};

module.exports = Inflector;
