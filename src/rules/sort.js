"use strict";

/**
 * Contains a set of methods for inflection rules sorting.
 *
 * @type {Object}
 */
const sort = {};

sort.rulesByApplicationDesc = (firstRule, secondRule, application) => {
    return !firstRule.applications.length && secondRule.applications.length && secondRule.applications.indexOf(application) !== -1;
};

module.exports = sort;
