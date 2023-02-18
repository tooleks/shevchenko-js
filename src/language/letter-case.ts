/**
 * Copies a letter case pattern from a template word to a target word.
 * Returns a modified target word in the letter case of the template word.
 */
export function copyLetterCase(templateWord: string, targetWord: string): string {
  let resultWord = '';

  for (let index = 0; index < targetWord.length; index += 1) {
    const templateLetter = templateWord[index] || templateWord[templateWord.length - 1];
    const targetLetter = targetWord[index];
    if (inLowerCase(templateLetter)) {
      resultWord += targetLetter.toLowerCase();
    } else if (inUpperCase(templateLetter)) {
      resultWord += targetLetter.toUpperCase();
    } else {
      resultWord += targetLetter;
    }
  }

  return resultWord;
}

/**
 * Detects if a letter is in the upper case at the specified index.
 */
function inUpperCase(word: string, index = 0): boolean {
  return word.charAt(index) === word.charAt(index).toUpperCase();
}

/**
 * Detects if a letter is in the lower case at the specified index.
 */
function inLowerCase(word: string, index = 0): boolean {
  return word.charAt(index) === word.charAt(index).toLowerCase();
}
