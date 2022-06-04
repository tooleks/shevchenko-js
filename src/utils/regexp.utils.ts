/**
 * Counts a number of groups in the given regular expression.
 */
export function countGroups(src: RegExp | string): number {
  const pattern = new RegExp(`${src.toString()}|`);
  const matches = pattern.exec('');
  if (matches == null) {
    return 0;
  }
  return matches.length - 1;
}
