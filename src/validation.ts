import { Gender } from './language';
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

  if (![Gender.Male, Gender.Female].includes(params.gender)) {
    throw new TypeError(
      `"anthroponym.gender" must be one of the following: "${Gender.Male}", "${Gender.Female}".`,
    );
  }

  if (
    typeof params.firstName === 'undefined' &&
    typeof params.middleName === 'undefined' &&
    typeof params.lastName === 'undefined'
  ) {
    throw new TypeError(
      'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".',
    );
  }

  if (typeof params.firstName !== 'undefined' && typeof params.firstName !== 'string') {
    throw new TypeError('"anthroponym.firstName" must be a string.');
  }

  if (typeof params.middleName !== 'undefined' && typeof params.middleName !== 'string') {
    throw new TypeError('"anthroponym.middleName" must be a string.');
  }

  if (typeof params.lastName !== 'undefined' && typeof params.lastName !== 'string') {
    throw new TypeError('"anthroponym.lastName" must be a string.');
  }
}
