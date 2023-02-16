export const PATTERN_VOWELS = /[аоуеиіяюєї]/gi;

/**
 * Returns a number of syllables in a given word.
 */
export function countSyllables(word: string): number {
  const matches = word.match(PATTERN_VOWELS);
  if (matches == null) {
    return 0;
  }
  return matches.length;
}
