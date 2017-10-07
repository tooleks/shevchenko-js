"use strict";

var UPPER_CASE = "u";
var LOWER_CASE = "l";
var NOT_RECOGNIZED_CASE = null;

/**
 * Contains a set of methods for manipulation of a string character cases.
 *
 * @type {object}
 */
var stringCaseMask = {};

/**
 * Load the case mask from the string.
 *
 * @param {string} value
 * @return {object}
 */
stringCaseMask.load = function (value) {
    return value.split("").reduce(function (mask, char) {
        if (string.isUpperCase(char)) {
            mask.push(UPPER_CASE);
        } else if (string.isLowerCase(char)) {
            mask.push(LOWER_CASE);
        } else {
            mask.push(NOT_RECOGNIZED_CASE);
        }
        return mask;
    }, []);
};

/**
 * Apply the case mask to the string.
 *
 * @param {object} mask
 * @param {string} value
 * @return {string}
 */
stringCaseMask.apply = function (mask, value) {
    return value.split("").reduce(function (result, char, index) {
        var charMask = mask[index];
        if (typeof charMask === "undefined" && mask.length !== 0) {
            charMask = mask[mask.length - 1];
        }
        if (charMask === UPPER_CASE) {
            char = char.toUpperCase();
        } else if (charMask === LOWER_CASE) {
            char = char.toLowerCase();
        }
        return result + char;
    }, "");
};

/**
 * Contains a set of methods for a string type.
 *
 * @type {object}
 */
var string = {};

/**
 * Detect if a character is in the upper case.
 *
 * @param {string} char
 */
string.isUpperCase = function (char) {
    return char === char.toUpperCase() && char !== char.toLowerCase();
};

/**
 * Detect if a character is in the lower case.
 *
 * @param {string} char
 */
string.isLowerCase = function (char) {
    return char === char.toLowerCase() && char !== char.toUpperCase();
};

/**
 * Convert a string of characters to a binary string.
 *
 * @param {string} string
 * @return {string}
 */
string.toBinary = function (string) {
    return string.split("").map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join("");
};

/**
 * Fill the left part of the string with a symbol to a given length.
 *
 * @param {string} string
 * @param {number} length
 * @param {string} symbol
 * @return {string}
 */
string.padLeft = function (string, length) {
    var symbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";

    var filler = new Array(length + 1).join(symbol);
    return filler.substring(0, filler.length - string.length) + string;
};

/**
 * Apply the case mask of the example string to the string.
 *
 * @param {string} exampleString
 * @param {string} string
 * @return {string}
 */
string.applyCaseMask = function (exampleString, string) {
    var mask = stringCaseMask.load(exampleString);
    return stringCaseMask.apply(mask, string);
};

module.exports = string;