/**
 * Detect if a character is in the upper case.
 *
 * @param {string} char
 */
export function isUpperCase(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

/**
 * Detect if a character is in the lower case.
 *
 * @param {string} char
 */
export function isLowerCase(char) {
  return char === char.toLowerCase() && char !== char.toUpperCase();
}

/**
 * Convert a string to a binary representation.
 *
 * @param {string} string
 * @return {string}
 */
export function toBinary(string) {
  return string
    .split('')
    .map((char) => char.charCodeAt(0).toString(2))
    .join('');
}

/**
 * Fill the left part of the string with a symbol to a given length.
 *
 * @param {string} string
 * @param {number} length
 * @param {string} symbol
 * @return {string}
 */
export function padLeft(string, length, symbol = '0') {
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
export function applyCaseMask(exampleString, string) {
  const UPPER_CASE = 'u';
  const LOWER_CASE = 'l';
  const NOT_RECOGNIZED_CASE = null;

  // Create case mask from the example string.
  const caseMask = exampleString.split('').reduce((mask, char) => {
    if (isUpperCase(char)) {
      mask.push(UPPER_CASE);
    } else if (isLowerCase(char)) {
      mask.push(LOWER_CASE);
    } else {
      mask.push(NOT_RECOGNIZED_CASE);
    }
    return mask;
  }, []);

  // Apply case mask to the desired string.
  return string.split('').reduce((result, char, index) => {
    let charMask = caseMask[index];
    if (typeof charMask === 'undefined' && caseMask.length !== 0) {
      charMask = caseMask[caseMask.length - 1];
    }
    if (charMask === UPPER_CASE) {
      char = char.toUpperCase();
    } else if (charMask === LOWER_CASE) {
      char = char.toLowerCase();
    }
    return result + char;
  }, '');
}
