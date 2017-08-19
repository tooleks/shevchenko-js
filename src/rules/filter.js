"use strict";

const Filter = {};

/**
 * Filter by the rule part of speech.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
Filter.byPos = (rule, value) => {
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
Filter.byApplication = (rule, value, strict = false) => {
    if (rule.applications.length) {
        return rule.applications.some((ruleValue) => ruleValue === value);
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
Filter.byGender = (rule, value) => {
    return rule.gender.indexOf(value) !== -1;
};

/**
 * Filter by the rule find regular expression.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
Filter.byRegexp = (rule, value) => {
    return (new RegExp(rule.regexp.find, "gm")).test(value);
};

module.exports = Filter;
