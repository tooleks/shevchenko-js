"use strict";

/**
 * Contains a set of methods for regular expressions.
 *
 * @type {object}
 */

var regexp = {};

/**
 * Count a number of groups in a regular expression string.
 *
 * @param {string} regexp
 * @return {number}
 */
regexp.countGroups = function (regexp) {
  return new RegExp(regexp.toString() + "|").exec("").length - 1;
};

module.exports = regexp;