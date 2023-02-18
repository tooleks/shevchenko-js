export const PATTERN_VOWELS = /[аоуеиіяюєї]/gi;

/**
 * Returns a number of syllables in a given word.
 */
function countSyllables(word: string): number {
  const matches = word.match(PATTERN_VOWELS);
  if (matches == null) {
    return 0;
  }
  return matches.length;
}

/**
 * Returns true if a given word is a monosyllable.
 * Returns false otherwise.
 */
export function isMonosyllable(word: string): boolean {
  return countSyllables(word) === 1;
}
