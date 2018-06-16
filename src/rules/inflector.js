"use strict";

const utils = require("../utils");

/**
 * Inflect a value by inflection rule.
 *
 * @param {Object} rule
 * @param {string} inflectionCaseName
 * @param {string} value
 * @return {string}
 */
function inflectByRule(rule, inflectionCaseName, value) {
    const regexp = rule.regexp.modify;
    const modifiers = rule.cases[inflectionCaseName][0];
    if (typeof modifiers === "object") {
        const inflectedValue = value.toLowerCase().replace(new RegExp(regexp, "gm"), (match, ...groups) => {
            let replacement = "";
            const count = utils.regexp.countGroups(regexp);
            for (let index = 0; index < count; index++) {
                replacement += applyGroupModifier(modifiers[index], groups[index]);
            }
            return replacement;
        });
        return utils.string.applyCaseMask(value, inflectedValue);
    }
    return value;
}

/**
 * Apply a group modifier to the value.
 *
 * @see inflectByRule
 *
 * @param {Object} modifier
 * @param {string} value
 * @return {string}
 */
function applyGroupModifier(modifier, value) {
    if (typeof modifier === "object") {
        const modify = getGroupModifiers()[modifier.type];
        if (typeof modify === "function") {
            return modify(value, modifier.value);
        }
    }
    return value;
}

/**
 * Get group modifier functions.
 *
 * @return {Object}
 */
function getGroupModifiers() {
    return {
        append: (value, modifier) => value + modifier,
        replace: (value, modifier) => modifier,
    };
}

module.exports = {inflectByRule, applyGroupModifier, getGroupModifiers};
