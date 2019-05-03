/**
 * Detects if a character is in the upper case at the specified index.
 *
 * @param {string} source
 * @param {number} pos The zero-based index of the desired character.
 */
export function isUpperCase(source, pos) {
  return source.charAt(pos) === source.charAt(pos).toUpperCase();
}

/**
 * Detects if a character is in the lower case at the specified index.
 *
 * @param {string} source
 * @param {number} pos The zero-based index of the desired character.
 */
export function isLowerCase(source, pos) {
  return source.charAt(pos) === source.charAt(pos).toLowerCase();
}

/**
 * Converts a string to a binary representation.
 *
 * @param {string} source
 * @returns {string}
 */
export function toBinary(source) {
  return source
    .split('')
    .map((char) => char.charCodeAt(0).toString(2))
    .join('');
}

/**
 * Applies the case mask of the source to the string.
 *
 * @param {string} source
 * @param {string} target
 * @returns {string}
 */
export function applyCaseMask(source, target) {
  const toUpperCase = 'toUpperCase';
  const toLowerCase = 'toLowerCase';
  const toOriginalCase = 'toString';

  const mask = source.split('').reduce((mask, char, pos) => {
    if (isUpperCase(source, pos)) {
      return [...mask, toUpperCase];
    } else if (isLowerCase(source, pos)) {
      return [...mask, toLowerCase];
    } else {
      return [...mask, toOriginalCase];
    }
  }, []);

  return target.split('').reduce((result, char, pos) => {
    const method = mask[pos] || mask[mask.length - 1] || toOriginalCase;
    return result + target[pos][method]();
  }, '');
}
