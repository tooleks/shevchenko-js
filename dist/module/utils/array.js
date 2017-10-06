"use strict";

/**
 * Contains a set of methods for an array type.
 *
 * @type {object}
 */

var array = {};

/**
 * Remove duplicates from an array.
 *
 * @param {Array} array
 * @return {Array}
 */
array.unique = function (array) {
  return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
};

module.exports = array;