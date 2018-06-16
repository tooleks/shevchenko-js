"use strict";

/**
 * Count a number of groups in a regular expression string.
 *
 * This is a kind of magic but this is a really handy function.
 *
 * @param {string} regexp
 * @return {number}
 */
function countGroups(regexp) {
    return new RegExp(`${regexp.toString()}|`).exec("").length - 1;
}

module.exports = {countGroups};
