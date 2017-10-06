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
 * Detect if a character is a segment break character.
 *
 * Used in compound last names such as "Нечуй-Левицький", to create case masks for each word.
 *
 * @param {string} char
 * @return {boolean}
 */
stringCaseMask.isSegmentBreakCharacter = function (char) {
    return ["-"].indexOf(char) !== -1;
};

/**
 * Load the case mask from the string.
 *
 * @param {string} value
 * @return {object}
 */
stringCaseMask.loadMask = function (value) {
    var segmentNumber = 0;

    var mask = value.split("").reduce(function (mask, char) {
        // If the current character is a segment break character go to the next segment.
        if (stringCaseMask.isSegmentBreakCharacter(char)) {
            segmentNumber++;
            return mask;
        }

        // Initialize the default value (an empty array) for a new segment.
        if (typeof mask[segmentNumber] === "undefined") {
            mask[segmentNumber] = [];
        }

        if (string.isUpperCase(char)) {
            mask[segmentNumber].push(UPPER_CASE);
        } else if (string.isLowerCase(char)) {
            mask[segmentNumber].push(LOWER_CASE);
        } else {
            mask[segmentNumber].push(NOT_RECOGNIZED_CASE);
        }

        return mask;
    }, {});

    return mask;
};

/**
 * Apply the case mask to the string.
 *
 * @param {object} mask
 * @param {string} value
 * @return {string}
 */
stringCaseMask.applyByMask = function (mask, value) {
    var segmentNumber = 0;
    var segmentIndex = 0;

    var result = value.split("").reduce(function (result, char) {
        // If the current character is a segment break character
        // go to the next segment and reset the segment index.
        if (stringCaseMask.isSegmentBreakCharacter(char)) {
            segmentNumber++;
            segmentIndex = -1;
        }

        var segment = mask[segmentNumber];
        var charMask = segment[segmentIndex++];

        // If the string length is bigger than a segment length
        // set the character mask to the last segment character mask value.
        if (typeof charMask === "undefined") {
            charMask = segment[segment.length - 1];
        }

        if (charMask === UPPER_CASE) {
            char = char.toUpperCase();
        } else if (charMask === LOWER_CASE) {
            char = char.toLowerCase();
        }

        return result + char;
    }, "");

    return result;
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
    var mask = stringCaseMask.loadMask(exampleString);
    return stringCaseMask.applyByMask(mask, string);
};

module.exports = string;