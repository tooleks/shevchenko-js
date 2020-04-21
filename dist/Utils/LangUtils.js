"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATTERN_VOWELS = /[аоуеиіяюєї]/gi;
/**
 * Counts vowel sounds in a given word.
 * Returns a number of vowels.
 */
function countVowels(word) {
    const matches = word.match(exports.PATTERN_VOWELS);
    if (matches == null) {
        return 0;
    }
    return matches.length;
}
exports.countVowels = countVowels;
//# sourceMappingURL=LangUtils.js.map