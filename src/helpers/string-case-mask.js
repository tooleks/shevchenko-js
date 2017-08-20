"use strict";

const Assert = require("./assert");

const StringCaseMask = {};

/**
 * An upper case identifier.
 *
 * @type {string}
 */
StringCaseMask.upperCase = "u";

/**
 * A lower case identifier.
 *
 * @type {string}
 */
StringCaseMask.lowerCase = "l";

/**
 * Not recognized case identifier.
 *
 * @type {string}
 */
StringCaseMask.notRecognizedCase = null;

/**
 * Detect if a character is a segment break character.
 *
 * Used in the double last names such as "Нечуй-Левицький", to create case mask segments for each word.
 *
 * @param {string} char
 * @return {boolean}
 */
StringCaseMask.isSegmentBreakCharacter = (char) => char === "-";

/**
 * Detect if a character is in the upper case.
 *
 * @param {string} char
 */
StringCaseMask.isUpperCase = (char) => char === char.toUpperCase() && char !== char.toLowerCase();

/**
 * Detect if a character is in the lower case.
 *
 * @param {string} char
 */
StringCaseMask.isLowerCase = (char) => char === char.toLowerCase() && char !== char.toUpperCase();

/**
 * Load the case mask from the string.
 *
 * @param {string} string
 * @returns {Object}
 */
StringCaseMask.loadMask = (string) => {
    Assert.string(string);
    const mask = {};
    let segmentNumber = 0;
    let stringIndex = 0;
    while (stringIndex < string.length) {
        let char = string.charAt(stringIndex++);
        // If the current character is a segment break character go to the next segment.
        if (StringCaseMask.isSegmentBreakCharacter(char)) {
            segmentNumber++;
            continue;
        }
        // Initialize the default value (an empty array) for a new segment.
        if (typeof mask[segmentNumber] === "undefined") mask[segmentNumber] = [];
        // If a character is in the upper case push the uppercase identifier into the segment array.
        if (StringCaseMask.isUpperCase(char)) mask[segmentNumber].push(StringCaseMask.upperCase);
        // If a character is in the lower case push the lowercase identifier into the segment array.
        else if (StringCaseMask.isLowerCase(char)) mask[segmentNumber].push(StringCaseMask.lowerCase);
        // If a character case is not recognized push the empty identifier into the segment array.
        else mask[segmentNumber].push(StringCaseMask.notRecognizedCase);
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
StringCaseMask.applyByMask = (mask, string) => {
    let result = "";
    let segmentNumber = 0;
    let segmentIndex = 0;
    let stringIndex = 0;
    while (stringIndex < string.length) {
        let char = string.charAt(stringIndex++);
        // If the current character is a segment break character go to the next segment and reset the segment index.
        if (StringCaseMask.isSegmentBreakCharacter(char)) {
            segmentNumber++;
            segmentIndex = -1;
        }
        let segment = mask[segmentNumber];
        let charMask = segment[segmentIndex++];
        // If the string length is bigger than a segment length set the character mask to the last segment character mask value.
        if (typeof charMask === "undefined") charMask = segment[segment.length - 1];
        // If a character mask equals the upper case identifier convert the character to upper case.
        if (charMask === StringCaseMask.upperCase) char = char.toUpperCase();
        // If a character mask equals the lower case identifier convert the character to lower case.
        else if (charMask === StringCaseMask.lowerCase) char = char.toLowerCase();
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
StringCaseMask.applyByExample = (exampleString, string) => {
    const mask = StringCaseMask.loadMask(exampleString);
    return StringCaseMask.applyByMask(mask, string);
};

module.exports = StringCaseMask;