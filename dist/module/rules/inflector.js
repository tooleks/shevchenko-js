"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = require("../utils");

/**
 * Contains a set of methods for words inflection.
 *
 * @type {object}
 */
var inflector = {};

/**
 * Inflect a value by inflection rule.
 *
 * @param {object} rule
 * @param {string} caseName
 * @param {string} value
 * @return {string}
 */
inflector.inflectByRule = function (rule, caseName, value) {
    if ((typeof rule === "undefined" ? "undefined" : _typeof(rule)) === "object") {
        var regexp = rule.regexp.modify;
        var modifiers = rule.cases[caseName][0];
        if ((typeof modifiers === "undefined" ? "undefined" : _typeof(modifiers)) === "object") {
            return value.replace(new RegExp(regexp, "gm"), function (match) {
                for (var _len = arguments.length, groups = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    groups[_key - 1] = arguments[_key];
                }

                var replacement = "";
                var count = utils.regexp.countGroups(regexp);
                for (var index = 0; index < count; index++) {
                    replacement += inflector.applyGroupModifier(modifiers[index], groups[index]);
                }
                return replacement;
            });
        }
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
inflector.applyGroupModifier = function (modifier, value) {
    if ((typeof modifier === "undefined" ? "undefined" : _typeof(modifier)) === "object") {
        var modify = inflector.getGroupModifiers()[modifier.type];
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
inflector.getGroupModifiers = function () {
    return {
        append: function append(value, modifier) {
            return value + modifier;
        },
        replace: function replace(value, modifier) {
            return modifier;
        }
    };
};

module.exports = inflector;