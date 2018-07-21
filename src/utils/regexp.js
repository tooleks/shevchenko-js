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
    const regExp = new RegExp(`${regexp.toString()}|`);
    return regExp.exec("").length - 1;
}

module.exports = {countGroups};
