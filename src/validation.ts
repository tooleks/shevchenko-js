import { GrammaticalGender } from './language';
import type { InflectAnthroponymParams } from './shevchenko';

/**
 * Validates given anthroponym object.
 * Throws an error if validation fails.
 *
 * @throws TypeError
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateAnthroponym(params: InflectAnthroponymParams): void {
  if (params == null) {
    throw new TypeError('"anthroponym" must be an object.');
  }

  if (typeof params !== 'object') {
    throw new TypeError('"anthroponym" must be an object.');
  }

  if (![GrammaticalGender.MASCULINE, GrammaticalGender.FEMININE].includes(params.gender)) {
    throw new TypeError(
      `"gender" must be one of the following: "${GrammaticalGender.MASCULINE}", "${GrammaticalGender.FEMININE}".`,
    );
  }

  if (
    typeof params.givenName === 'undefined' &&
    typeof params.patronymicName === 'undefined' &&
    typeof params.familyName === 'undefined'
  ) {
    throw new TypeError(
      'At least one of the following fields must present: "givenName", "patronymicName", "familyName".',
    );
  }

  if (typeof params.givenName !== 'undefined' && typeof params.givenName !== 'string') {
    throw new TypeError('"givenName" must be a string.');
  }

  if (typeof params.patronymicName !== 'undefined' && typeof params.patronymicName !== 'string') {
    throw new TypeError('"patronymicName" must be a string.');
  }

  if (typeof params.familyName !== 'undefined' && typeof params.familyName !== 'string') {
    throw new TypeError('"familyName" must be a string.');
  }
}
