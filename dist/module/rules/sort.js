"use strict";

/**
 * Contains a set of methods for inflection rules sorting.
 *
 * @type {object}
 */

var sort = {};

/**
 * Sort by rule applications ("noun", "adjective" etc.).
 *
 * @param {object} firstRule
 * @param {object} secondRule
 * @param {string} value
 * @return {boolean}
 */
sort.rulesByApplication = function (firstRule, secondRule, value) {
  return !firstRule.applications.length && secondRule.applications.length && secondRule.applications.indexOf(value) !== -1;
};

module.exports = sort;