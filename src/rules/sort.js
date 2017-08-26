"use strict";

/**
 * Contains a set of methods for inflection rules sorting.
 *
 * @type {Object}
 */
const sort = {};

/**
 * Sort by the rule applications ("noun", "adjective" etc.) descending.
 *
 * @param {Object} firstRule
 * @param {Object} secondRule
 * @param {string} value
 * @return {boolean}
 */
sort.rulesByApplicationDesc = (firstRule, secondRule, value) => {
    return !firstRule.applications.length && secondRule.applications.length && secondRule.applications.indexOf(value) !== -1;
};

module.exports = sort;
