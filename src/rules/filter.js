"use strict";

/**
 * Filter by the rule part of speech.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
function byPos(rule, value) {
    return value ? value === rule.pos : true;
}

/**
 * Filter by the rule applications.
 *
 * @param {Object} rule
 * @param {Array} rule.applications
 * @param {string} value
 * @param {boolean} strict
 * @return {boolean}
 */
function byApplication(rule, value, strict = false) {
    if (rule.applications.length) {
        return rule.applications.some((ruleValue) => ruleValue === value);
    }
    return !strict;
}

/**
 * Filter by the rule gender.
 *
 * @param {Object} rule
 * @param {string} rule.gender
 * @param {string} value
 * @return {boolean}
 */
function byGender(rule, value) {
    return rule.gender.indexOf(value) !== -1;
}

/**
 * Filter by the rule find regular expression.
 *
 * @param {Object} rule
 * @param {Object} rule.regexp
 * @param {string} rule.regexp.find
 * @param {string} value
 * @return {boolean}
 */
function byRegexp(rule, value) {
    const regExp = new RegExp(rule.regexp.find, "gm");
    return regExp.test(value.toLowerCase());
}

module.exports = {byPos, byApplication, byGender, byRegexp};
