/**
 * Counts a number of groups in a regular expression.
 *
 * @param {RegExp|string} regExp
 * @returns {number}
 */
export function countGroups(regExp) {
  return new RegExp(regExp.toString() + '|').exec('').length - 1;
}
