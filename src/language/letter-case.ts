/**
 * Copies letter cases from a source word to the destination word.
 * Returns a destination word after modification.
 */
export function copyLetterCase(source: string, destination: string): string {
  let result = '';

  const letterCasePattern: LetterCase[] = [];
  for (let index = 0; index < source.length; index += 1) {
    const letter = source[index];
    if (inLowerCase(letter)) {
      letterCasePattern.push(LetterCase.LOWERCASE);
    } else if (inUpperCase(letter)) {
      letterCasePattern.push(LetterCase.UPPERCASE);
    } else {
      letterCasePattern.push(LetterCase.UNKNOWN);
    }
  }

  for (let index = 0; index < destination.length; index += 1) {
    const letter = destination[index];
    const letterCase = letterCasePattern[index] || letterCasePattern[letterCasePattern.length - 1];
    if (letterCase === LetterCase.LOWERCASE) {
      result += letter.toLowerCase();
    } else if (letterCase === LetterCase.UPPERCASE) {
      result += letter.toUpperCase();
    } else {
      result += letter.toString();
    }
  }

  return result;
}

enum LetterCase {
  LOWERCASE,
  UPPERCASE,
  UNKNOWN = -1,
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
