"use strict";

/**
 * Contains a set of methods for inflection rules filtering.
 *
 * @type {Object}
 */
const filter = {};

/**
 * Filter by the rule part of speech.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
filter.byPos = (rule, value) => {
    return value ? value === rule.pos : true;
};

/**
 * Filter by the rule applications.
 *
 * @param {Object} rule
 * @param {string} value
 * @param {boolean} strict
 * @return {boolean}
 */
filter.byApplication = (rule, value, strict = false) => {
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
filter.byGender = (rule, value) => {
    return rule.gender.indexOf(value) !== -1;
};

/**
 * Filter by the rule find regular expression.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
filter.byRegexp = (rule, value) => {
    return (new RegExp(rule.regexp.find, "gm")).test(value);
};

module.exports = filter;
