"use strict";

/**
 * Contains a set of methods for a string type.
 *
 * @type {Object}
 */

var array = {};

/**
 * Remove duplicates from an array.
 *
 * @param {array} array
 * @return {array}
 */
array.unique = function (array) {
  return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
};

module.exports = array;