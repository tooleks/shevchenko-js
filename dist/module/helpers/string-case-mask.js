"use strict";

var assert = require("./assert");

var stringCaseMask = {};

/**
 * An upper case identifier.
 *
 * @type {string}
 */
stringCaseMask.upperCase = "u";

/**
 * A lower case identifier.
 *
 * @type {string}
 */
stringCaseMask.lowerCase = "l";

/**
 * Not recognized case identifier.
 *
 * @type {string}
 */
stringCaseMask.notRecognizedCase = null;

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
 * Detect if a character is in the upper case.
 *
 * @param {string} char
 */
stringCaseMask.isUpperCase = function (char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
};

/**
 * Detect if a character is in the lower case.
 *
 * @param {string} char
 */
stringCaseMask.isLowerCase = function (char) {
  return char === char.toLowerCase() && char !== char.toUpperCase();
};

/**
 * Load the case mask from the string.
 *
 * @param {string} string
 * @returns {Object}
 */
stringCaseMask.loadMask = function (string) {
  assert.string(string);
  var mask = {};
  var segmentNumber = 0;
  var stringIndex = 0;
  while (stringIndex < string.length) {
    var char = string.charAt(stringIndex++);
    // If the current character is a segment break character go to the next segment.
    if (stringCaseMask.isSegmentBreakCharacter(char)) {
      segmentNumber++;
      continue;
    }
    // Initialize the default value (an empty array) for a new segment.
    if (typeof mask[segmentNumber] === "undefined") mask[segmentNumber] = [];
    // If a character is in the upper case push the uppercase identifier into the segment array.
    if (stringCaseMask.isUpperCase(char)) mask[segmentNumber].push(stringCaseMask.upperCase);
    // If a character is in the lower case push the lowercase identifier into the segment array.
    else if (stringCaseMask.isLowerCase(char)) mask[segmentNumber].push(stringCaseMask.lowerCase);
      // If a character case is not recognized push the empty identifier into the segment array.
      else mask[segmentNumber].push(stringCaseMask.notRecognizedCase);
  }
  return mask;
};

/**
 * Apply the case mask to the string.
 *
 * @param {Object} mask
 * @param {string} string
 * @returns {string}
 */
stringCaseMask.applyByMask = function (mask, string) {
  var result = "";
  var segmentNumber = 0;
  var segmentIndex = 0;
  var stringIndex = 0;
  while (stringIndex < string.length) {
    var char = string.charAt(stringIndex++);
    // If the current character is a segment break character go to the next segment and reset the segment index.
    if (stringCaseMask.isSegmentBreakCharacter(char)) {
      segmentNumber++;
      segmentIndex = -1;
    }
    var segment = mask[segmentNumber];
    var charMask = segment[segmentIndex++];
    // If the string length is bigger than a segment length set the character mask to the last segment character mask value.
    if (typeof charMask === "undefined") charMask = segment[segment.length - 1];
    // If a character mask equals the upper case identifier convert the character to upper case.
    if (charMask === stringCaseMask.upperCase) char = char.toUpperCase();
    // If a character mask equals the lower case identifier convert the character to lower case.
    else if (charMask === stringCaseMask.lowerCase) char = char.toLowerCase();
    // Append the character to the resulting string.
    result += char;
  }
  return result;
};

/**
 * Apply the case mask of the example string to the string.
 *
 * @param {string} exampleString
 * @param {string} string
 * @returns {string}
 */
stringCaseMask.applyByExample = function (exampleString, string) {
  var mask = stringCaseMask.loadMask(exampleString);
  return stringCaseMask.applyByMask(mask, string);
};

module.exports = stringCaseMask;