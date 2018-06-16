"use strict";

/**
 * Sort by rule applications ("noun", "adjective" etc.).
 *
 * @param {Object} firstRule
 * @param {Object} secondRule
 * @param {string} value
 * @return {boolean}
 */
function byApplication(firstRule, secondRule, value) {
    return (
        !firstRule.applications.length &&
        secondRule.applications.length &&
        secondRule.applications.indexOf(value) !== -1
    );
}

module.exports = {byApplication};
