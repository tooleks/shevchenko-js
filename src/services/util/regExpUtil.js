/**
 * Count a number of groups in a regular expression.
 *
 * @param {RegExp|string} regExp
 * @return {number}
 */
export function countGroups(regExp) {
    return new RegExp(`${regExp}|`).exec("").length - 1;
}
