"use strict";

const UPPER_CASE = "u";
const LOWER_CASE = "l";
const NOT_RECOGNIZED_CASE = null;

/**
 * Contains a set of methods for manipulation of a string character cases.
 *
 * @type {object}
 */
const stringCaseMask = {};

/**
 * Load the case mask from the string.
 *
 * @param {string} value
 * @return {object}
 */
stringCaseMask.load = (value) => {
    return value.split("").reduce((mask, char) => {
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
stringCaseMask.apply = (mask, value) => {
    return value.split("").reduce((result, char, index) => {
        let charMask = mask[index];
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
const string = {};

/**
 * Detect if a character is in the upper case.
 *
 * @param {string} char
 */
string.isUpperCase = (char) => char === char.toUpperCase() && char !== char.toLowerCase();

/**
 * Detect if a character is in the lower case.
 *
 * @param {string} char
 */
string.isLowerCase = (char) => char === char.toLowerCase() && char !== char.toUpperCase();

/**
 * Convert a string of characters to a binary string.
 *
 * @param {string} string
 * @return {string}
 */
string.toBinary = (string) => string.split("").map((char) => char.charCodeAt(0).toString(2)).join("");

/**
 * Fill the left part of the string with a symbol to a given length.
 *
 * @param {string} string
 * @param {number} length
 * @param {string} symbol
 * @return {string}
 */
string.padLeft = (string, length, symbol = "0") => {
    const filler = new Array(length + 1).join(symbol);
    return filler.substring(0, filler.length - string.length) + string;
};

/**
 * Apply the case mask of the example string to the string.
 *
 * @param {string} exampleString
 * @param {string} string
 * @return {string}
 */
string.applyCaseMask = (exampleString, string) => {
    const mask = stringCaseMask.load(exampleString);
    return stringCaseMask.apply(mask, string);
};

module.exports = string;
