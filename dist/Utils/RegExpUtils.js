"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Counts a number of groups in a given regular expression.
 */
function countGroups(src) {
    const pattern = new RegExp(`${src.toString()}|`);
    const matches = pattern.exec('');
    if (matches == null) {
        return 0;
    }
    return matches.length - 1;
}
exports.countGroups = countGroups;
//# sourceMappingURL=RegExpUtils.js.map