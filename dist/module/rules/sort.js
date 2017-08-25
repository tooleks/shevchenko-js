"use strict";

/**
 * Contains a set of methods for inflection rules sorting.
 *
 * @type {Object}
 */

var sort = {};

sort.rulesByApplicationDesc = function (firstRule, secondRule, application) {
  return !firstRule.applications.length && secondRule.applications.length && secondRule.applications.indexOf(application) !== -1;
};

module.exports = sort;