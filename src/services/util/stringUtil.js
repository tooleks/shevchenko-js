/**
 * Detect if a character is in the upper case at the specified index.
 *
 * @param {string} string
 * @param {number} pos The zero-based index of the desired character.
 */
export function isUpperCase(string, pos) {
  return string.charAt(pos) === string.charAt(pos).toUpperCase();
}

/**
 * Detect if a character is in the lower case at the specified index.
 *
 * @param {string} string
 * @param {number} pos The zero-based index of the desired character.
 */
export function isLowerCase(string, pos) {
  return string.charAt(pos) === string.charAt(pos).toLowerCase();
}

/**
 * Convert a string to a binary representation.
 *
 * @param {string} string
 * @returns {string}
 */
export function toBinary(string) {
  return string
    .split('')
    .map((char) => char.charCodeAt(0).toString(2))
    .join('');
}

/**
 * Apply the case mask of the source to the string.
 *
 * @param {string} string
 * @param {string} source
 * @returns {string}
 */
export function applyCaseMask(string, source) {
  const toUpperCase = 'toUpperCase';
  const toLowerCase = 'toLowerCase';
  const toOriginalCase = 'toString';

  const mask = source.split('').reduce((mask, char, pos) => {
    if (isUpperCase(source, pos)) {
      mask.push(toUpperCase);
      return mask;
    } else if (isLowerCase(source, pos)) {
      mask.push(toLowerCase);
      return mask;
    } else {
      mask.push(toOriginalCase);
      return mask;
    }
  }, []);

  return string.split('').reduce((result, char, pos) => {
    const method = mask[pos] || mask[mask.length - 1] || toOriginalCase;
    return result + string[pos][method]();
  }, '');
}
