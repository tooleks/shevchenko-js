"use strict";

var sort = {};

sort.rulesByApplicationDesc = function (firstRule, secondRule, application) {
    return !firstRule.applications.length && secondRule.applications.length && secondRule.applications.indexOf(application) !== -1;
};

module.exports = sort;