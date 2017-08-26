"use strict";

/**
 * Contains a set of methods for inflection rules filtering.
 *
 * @type {Object}
 */

var filter = {};

/**
 * Filter by the rule part of speech.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
filter.byPos = function (rule, value) {
  return value ? value === rule.pos : true;
};

/**
 * Filter by the rule applications.
 *
 * @param {Object} rule
 * @param {string} value
 * @param {boolean} strict
 * @return {*}
 */
filter.byApplication = function (rule, value) {
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
filter.byGender = function (rule, value) {
  return rule.gender.indexOf(value) !== -1;
};

/**
 * Filter by the rule find regular expression.
 *
 * @param {Object} rule
 * @param {string} value
 * @return {boolean}
 */
filter.byRegexp = function (rule, value) {
  return new RegExp(rule.regexp.find, "gm").test(value);
};

module.exports = filter;