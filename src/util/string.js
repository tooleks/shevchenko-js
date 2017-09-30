"use strict";

const UPPER_CASE = "u";
const LOWER_CASE = "l";
const NOT_RECOGNIZED_CASE = null;

/**
 * Contains a set of methods for manipulation of a string character cases.
 *
 * @type {Object}
 */
const stringCaseMask = {};

/**
 * Detect if a character is a segment break character.
 *
 * Used in the double last names such as "Нечуй-Левицький", to create case masks for each word.
 *
 * @param {string} char
 * @return {boolean}
 */
stringCaseMask.isSegmentBreakCharacter = (char) => char === "-";

/**
 * Load the case mask from the string.
 *
 * @param {string} value
 * @return {Object}
 */
stringCaseMask.loadMask = (value) => {
    const mask = {};
    let segmentNumber = 0;
    let stringIndex = 0;

    while (stringIndex < value.length) {
        let char = value.charAt(stringIndex++);
        // If the current character is a segment break character
        // go to the next segment.
        if (stringCaseMask.isSegmentBreakCharacter(char)) {
            segmentNumber++;
            continue;
        }

        // Initialize the default value (an empty array) for a new segment.
        if (typeof mask[segmentNumber] === "undefined") mask[segmentNumber] = [];

        if (string.isUpperCase(char)) mask[segmentNumber].push(UPPER_CASE);
        else if (string.isLowerCase(char)) mask[segmentNumber].push(LOWER_CASE);
        else mask[segmentNumber].push(NOT_RECOGNIZED_CASE);
    }

    return mask;
};

/**
 * Apply the case mask to the string.
 *
 * @param {Object} mask
 * @param {string} value
 * @return {string}
 */
stringCaseMask.applyByMask = (mask, value) => {
    let result = "";
    let segmentNumber = 0;
    let segmentIndex = 0;
    let stringIndex = 0;

    while (stringIndex < value.length) {
        let char = value.charAt(stringIndex++);
        // If the current character is a segment break character
        // go to the next segment and reset the segment index.
        if (stringCaseMask.isSegmentBreakCharacter(char)) {
            segmentNumber++;
            segmentIndex = -1;
        }

        let segment = mask[segmentNumber];
        let charMask = segment[segmentIndex++];
        // If the string length is bigger than a segment length
        // set the character mask to the last segment character mask value.
        if (typeof charMask === "undefined") charMask = segment[segment.length - 1];

        if (charMask === UPPER_CASE) char = char.toUpperCase();
        else if (charMask === LOWER_CASE) char = char.toLowerCase();
        // Append the character to the resulting string.
        result += char;
    }

    return result;
};

/**
 * Contains a set of methods for a string type.
 *
 * @type {Object}
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
    const filler = (new Array(length + 1)).join(symbol);
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
    const mask = stringCaseMask.loadMask(exampleString);
    return stringCaseMask.applyByMask(mask, string);
};

module.exports = string;
