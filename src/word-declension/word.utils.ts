enum LetterCase {
  LOWERCASE,
  UPPERCASE,
  UNKNOWN,
}

/**
 * Copies letter cases from source to destination string.
 * Returns destination string after modification.
 */
export function copyLetterCase(src: string, dest: string): string {
  let result = '';

  const srcLetterCases: LetterCase[] = [];
  const srcChars = src.split('');
  for (let pos = 0; pos < srcChars.length; pos += 1) {
    const srcChar = srcChars[pos];
    if (isLowerCase(srcChar)) {
      srcLetterCases.push(LetterCase.LOWERCASE);
    } else if (isUpperCase(srcChar)) {
      srcLetterCases.push(LetterCase.UPPERCASE);
    } else {
      srcLetterCases.push(LetterCase.UNKNOWN);
    }
  }

  const destChars = dest.split('');
  for (let pos = 0; pos < destChars.length; pos += 1) {
    const destChar = destChars[pos];
    const srcLetterCase = srcLetterCases[pos] || srcLetterCases[srcLetterCases.length - 1];
    if (srcLetterCase === LetterCase.LOWERCASE) {
      result += destChar.toLowerCase();
    } else if (srcLetterCase === LetterCase.UPPERCASE) {
      result += destChar.toUpperCase();
    } else {
      result += destChar.toString();
    }
  }

  return result;
}

/**
 * Detects if a character is in the upper case at the specified index.
 */
function isUpperCase(src: string, pos = 0): boolean {
  return src.charAt(pos) === src.charAt(pos).toUpperCase();
}

/**
 * Detects if a character is in the lower case at the specified index.
 */
function isLowerCase(src: string, pos = 0): boolean {
  return src.charAt(pos) === src.charAt(pos).toLowerCase();
}
