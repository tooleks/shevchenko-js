"use strict";

const UPPER_CASE = "u";
const LOWER_CASE = "l";
const NOT_RECOGNIZED_CASE = null;

/**
 * Get case mask from the string.
 *
 * @param {string} value
 * @return {Object}
 */
function getCaseMask(value) {
    return value.split("").reduce((mask, char) => {
        if (isUpperCase(char)) {
            mask.push(UPPER_CASE);
        } else if (isLowerCase(char)) {
            mask.push(LOWER_CASE);
        } else {
            mask.push(NOT_RECOGNIZED_CASE);
        }
        return mask;
    }, []);
}

/**
 * Restore case mask to the string.
 *
 * @param {Object} mask
 * @param {string} value
 * @return {string}
 */
function restoreCaseMask(mask, value) {
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
}

/**
 * Detect if a character is in the upper case.
 *
 * @param {string} char
 */
function isUpperCase(char) {
    return char === char.toUpperCase() && char !== char.toLowerCase();
}

/**
 * Detect if a character is in the lower case.
 *
 * @param {string} char
 */
function isLowerCase(char) {
    return char === char.toLowerCase() && char !== char.toUpperCase();
}

/**
 * Convert a string of characters to a binary string.
 *
 * @param {string} string
 * @return {string}
 */
function toBinary(string) {
    return string
        .split("")
        .map((char) => char.charCodeAt(0).toString(2))
        .join("");
}

/**
 * Fill the left part of the string with a symbol to a given length.
 *
 * @param {string} string
 * @param {number} length
 * @param {string} symbol
 * @return {string}
 */
function padLeft(string, length, symbol = "0") {
    const filler = new Array(length + 1).join(symbol);
    return filler.substring(0, filler.length - string.length) + string;
}

/**
 * Apply the case mask of the example string to the string.
 *
 * @param {string} exampleString
 * @param {string} string
 * @return {string}
 */
function applyCaseMask(exampleString, string) {
    const mask = getCaseMask(exampleString);
    return restoreCaseMask(mask, string);
}

module.exports = {isUpperCase, isLowerCase, toBinary, padLeft, applyCaseMask};
