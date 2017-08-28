"use strict";

var assert = require("./assert");

var UPPER_CASE = "u";
var LOWER_CASE = "l";
var NOT_RECOGNIZED_CASE = null;

/**
 * Contains a set of methods for manipulation of a string character cases.
 *
 * @type {Object}
 */
var stringCaseMask = {};

/**
 * Detect if a character is a segment break character.
 *
 * Used in the double last names such as "Нечуй-Левицький", to create case mask segments for each word.
 *
 * @param {string} char
 * @return {boolean}
 */
stringCaseMask.isSegmentBreakCharacter = function (char) {
  return char === "-";
};

/**
 * Load the case mask from the string.
 *
 * @param {string} value
 * @returns {Object}
 */
stringCaseMask.loadMask = function (value) {
  assert.string(value);
  var mask = {};
  var segmentNumber = 0;
  var stringIndex = 0;

  while (stringIndex < value.length) {
    var char = value.charAt(stringIndex++);
    // If the current character is a segment break character
    // go to the next segment.
    if (stringCaseMask.isSegmentBreakCharacter(char)) {
      segmentNumber++;
      continue;
    }

    // Initialize the default value (an empty array) for a new segment.
    if (typeof mask[segmentNumber] === "undefined") mask[segmentNumber] = [];

    if (string.isUpperCase(char)) mask[segmentNumber].push(UPPER_CASE);else if (string.isLowerCase(char)) mask[segmentNumber].push(LOWER_CASE);else mask[segmentNumber].push(NOT_RECOGNIZED_CASE);
  }

  return mask;
};

/**
 * Apply the case mask to the string.
 *
 * @param {Object} mask
 * @param {string} value
 * @returns {string}
 */
stringCaseMask.applyByMask = function (mask, value) {
  var result = "";
  var segmentNumber = 0;
  var segmentIndex = 0;
  var stringIndex = 0;

  while (stringIndex < value.length) {
    var char = value.charAt(stringIndex++);
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
    if (typeof charMask === "undefined") charMask = segment[segment.length - 1];

    if (charMask === UPPER_CASE) char = char.toUpperCase();else if (charMask === LOWER_CASE) char = char.toLowerCase();
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
 * @returns {string}
 */
string.applyCaseMask = function (exampleString, string) {
  var mask = stringCaseMask.loadMask(exampleString);
  return stringCaseMask.applyByMask(mask, string);
};

module.exports = string;