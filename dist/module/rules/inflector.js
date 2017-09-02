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
 * @return {string}
 */
inflector.inflectByRule = function (rule, caseName, value) {
    if (typeof rule === "undefined") return value;
    var regexp = rule.regexp.modify;
    var modifiers = rule.cases[caseName][0]; // Retrieve the first group modifiers object by case name.
    return value.replace(new RegExp(regexp, "gm"), function (match) {
        for (var _len = arguments.length, groups = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            groups[_key - 1] = arguments[_key];
        }

        var replacement = "";
        var count = inflector.countRegexpGroups(regexp);
        for (var index = 0; index < count; index++) {
            replacement += inflector.applyGroupModifier(modifiers && modifiers[index], groups[index]);
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
 * @return {string}
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
 * @return {number}
 */
inflector.countRegexpGroups = function (regexp) {
    return new RegExp(regexp.toString() + "|").exec("").length - 1;
};

module.exports = inflector;