"use strict";

const utils = require("../utils");

/**
 * Contains a set of methods for words inflection.
 *
 * @type {object}
 */
const inflector = {};

/**
 * Inflect a value by inflection rule.
 *
 * @param {object} rule
 * @param {string} caseName
 * @param {string} value
 * @return {string}
 */
inflector.inflectByRule = (rule, caseName, value) => {
    const regexp = rule.regexp.modify;
    const modifiers = rule.cases[caseName][0];
    if (typeof modifiers === "object") {
        const inflectedValue = value.toLowerCase().replace(new RegExp(regexp, "gm"), (match, ...groups) => {
            let replacement = "";
            const count = utils.regexp.countGroups(regexp);
            for (let index = 0; index < count; index++) {
                replacement += inflector.applyGroupModifier(modifiers[index], groups[index]);
            }
            return replacement;
        });
        return utils.string.applyCaseMask(value, inflectedValue);
    }
    return value;
};

/**
 * Apply a group modifier to the value.
 *
 * @see inflector.inflectByRule
 *
 * @param {object} modifier
 * @param {string} value
 * @return {string}
 */
inflector.applyGroupModifier = (modifier, value) => {
    if (typeof modifier === "object") {
        const modify = inflector.getGroupModifiers()[modifier.type];
        if (typeof modify === "function") {
            return modify(value, modifier.value);
        }
    }
    return value;
};

/**
 * Get group modifier functions.
 *
 * @return {object}
 */
inflector.getGroupModifiers = () => {
    return {
        append: (value, modifier) => value + modifier,
        replace: (value, modifier) => modifier,
    };
};

module.exports = inflector;
