/**
 * Match rule gender.
 *
 * @param {object} rule
 * @param {string} rule.gender
 * @param {Gender} gender
 * @return {boolean}
 */
export function matchGender(rule, gender) {
    return rule.gender.indexOf(gender.valueOf()) !== -1;
}

/**
 * Match rule usage.
 *
 * @param {object} rule
 * @param {Array<string>} rule.usages
 * @param {string} usage
 * @param {boolean} [strict=false]
 * @return {boolean}
 */
export function matchUsage(rule, usage, strict = false) {
    if (rule.usages.length) {
        return rule.usages.indexOf(usage) !== -1;
    }
    return !strict;
}

/**
 * Match rule regular expression.
 *
 * @param {object} rule
 * @param {object} rule.regexp
 * @param {string} rule.regexp.find
 * @param {string} word
 * @return {boolean}
 */
export function matchRegExp(rule, word) {
    return new RegExp(rule.regexp.find, "gim").test(word);
}

/**
 * Match rul part of speech.
 *
 * @param {object} rule
 * @param {object} rule.pos
 * @param {string} pos
 * @return {boolean}
 */
export function matchPos(rule, pos) {
    if (pos === null) {
        return true;
    }
    return rule.pos === pos;
}

/**
 * @param {object} firstRule
 * @param {Array<string>} firstRule.usages
 * @param {object} secondRule
 * @param {Array<string>} secondRule.usages
 * @param {string} usage
 * @return {boolean}
 */
export function usageSorter(firstRule, secondRule, usage) {
    return !firstRule.usages.length && secondRule.usages.length && secondRule.usages.indexOf(usage) !== -1;
}
