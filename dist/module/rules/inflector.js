"use strict";

/**
 * Contains a set of methods for words inflection.
 *
 * @type {Object}
 */

var inflector = {};

/**
 * Inflect a value by inflection rule.
 *
 * @param {Object} rule
 * @param {string} caseName
 * @param {string} value
 * @returns {string}
 */
inflector.inflectByRule = function (rule, caseName, value) {
    if (typeof rule === "undefined") return value;
    var regexp = rule.regexp.modify;
    var modifiers = rule.cases[caseName][0]; // Retrieve the first group modifiers object by case name.
    return value.replace(new RegExp(regexp, "gm"), function (match) {
        var replacement = "";
        var count = inflector.countRegexpGroups(regexp);
        var index = 0;
        while (index < count) {
            var modifier = typeof modifiers === "undefined" ? modifiers : modifiers[index];
            replacement += inflector.applyGroupModifier(modifier, arguments.length <= index + 1 ? undefined : arguments[index + 1]);
            index++;
        }
        return replacement;
    });
};

/**
 * Apply a group modifier to the value.
 *
 * @see inflector.inflectByRule
 *
 * @param {Object} modifier
 * @param {string} value
 * @returns {string}
 */
inflector.applyGroupModifier = function (modifier, value) {
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
inflector.countRegexpGroups = function (regexp) {
    return new RegExp(regexp.toString() + "|").exec("").length - 1;
};

module.exports = inflector;