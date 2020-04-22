/**
 * Copies letter cases from source to destination string.
 * Returns destination string after modification.
 */
export function copyLetterCase(src, dest) {
    let result = '';
    const srcLetterCases = [];
    const srcChars = src.split('');
    for (let pos = 0; pos < srcChars.length; pos += 1) {
        const srcChar = srcChars[pos];
        if (isLowerCase(srcChar)) {
            srcLetterCases.push('lowercase');
        }
        else if (isUpperCase(srcChar)) {
            srcLetterCases.push('uppercase');
        }
        else {
            srcLetterCases.push('special');
        }
    }
    const destChars = dest.split('');
    for (let pos = 0; pos < destChars.length; pos += 1) {
        const destChar = destChars[pos];
        const srcLetterCase = srcLetterCases[pos] || srcLetterCases[srcLetterCases.length - 1];
        if (srcLetterCase === 'lowercase') {
            result += destChar.toLowerCase();
        }
        else if (srcLetterCase === 'uppercase') {
            result += destChar.toUpperCase();
        }
        else {
            result += destChar.toString();
        }
    }
    return result;
}
/**
 * Detects if a character is in the upper case at the specified index.
 */
export function isUpperCase(src, pos = 0) {
    return src.charAt(pos) === src.charAt(pos).toUpperCase();
}
/**
 * Detects if a character is in the lower case at the specified index.
 */
export function isLowerCase(src, pos = 0) {
    return src.charAt(pos) === src.charAt(pos).toLowerCase();
}
//# sourceMappingURL=StringUtils.js.map