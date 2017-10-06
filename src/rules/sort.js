"use strict";

/**
 * Contains a set of methods for inflection rules sorting.
 *
 * @type {object}
 */
const sort = {};

/**
 * Sort by the rule applications ("noun", "adjective" etc.) descending.
 *
 * @param {object} firstRule
 * @param {object} secondRule
 * @param {string} value
 * @return {boolean}
 */
sort.rulesByApplicationDesc = (firstRule, secondRule, value) => {
    return !firstRule.applications.length && secondRule.applications.length && secondRule.applications.indexOf(value) !== -1;
};

module.exports = sort;
