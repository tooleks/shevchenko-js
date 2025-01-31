export const VOWEL_PATTERN = /[аоуеиіяюєї]/gi;
export const APOSTROPHE_PATTERN = /['’ʼ]/gi;

/**
 * Returns a number of syllables in a given word.
 */
function countSyllables(word: string): number {
  const matches = word.match(VOWEL_PATTERN);
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
