/**
 * Counts a number of groups in a given regular expression.
 */
export function countGroups(src) {
    const pattern = new RegExp(`${src.toString()}|`);
    const matches = pattern.exec('');
    if (matches == null) {
        return 0;
    }
    return matches.length - 1;
}
//# sourceMappingURL=RegExpUtils.js.map