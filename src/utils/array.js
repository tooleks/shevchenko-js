"use strict";

/**
 * Contains a set of methods for an array type.
 *
 * @type {object}
 */
const array = {};

/**
 * Remove duplicates from an array.
 *
 * @param {Array} array
 * @return {Array}
 */
array.unique = (array) => Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);

module.exports = array;
