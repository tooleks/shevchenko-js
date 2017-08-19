"use strict";

var Filter = {};

/**
 * Filter by the rule part of speech.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
Filter.byPos = function (rule, value) {
    return value ? rule.pos === value : true;
};

/**
 * Filter by the rule applications.
 *
 * @param {Object} rule
 * @param {string} value
 * @param {boolean} strict
 * @return {*}
 */
Filter.byApplication = function (rule, value) {
    var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (rule.applications.length) {
        return rule.applications.some(function (ruleValue) {
            return ruleValue === value;
        });
    }
    return !strict;
};

/**
 * Filter by the rule gender.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
Filter.byGender = function (rule, value) {
    return rule.gender.indexOf(value) !== -1;
};

/**
 * Filter by the rule find regular expression.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
Filter.byRegexp = function (rule, value) {
    return new RegExp(rule.regexp.find, "gm").test(value);
};

module.exports = Filter;