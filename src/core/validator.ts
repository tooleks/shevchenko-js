import { Gender } from '../language';

/**
 * Validates given anthroponym object.
 * Throws an error if validation fails.
 *
 * @throws TypeError
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateAnthroponym(anthroponym: any): void {
  if (anthroponym == null) {
    throw new TypeError('"anthroponym" must be an object.');
  }

  if (typeof anthroponym !== 'object') {
    throw new TypeError('"anthroponym" must be an object.');
  }

  if (![Gender.Male, Gender.Female].includes(anthroponym.gender)) {
    throw new TypeError(
      `"anthroponym.gender" must be one of the following: "${Gender.Male}", "${Gender.Female}".`,
    );
  }

  if (
    typeof anthroponym.firstName === 'undefined' &&
    typeof anthroponym.middleName === 'undefined' &&
    typeof anthroponym.lastName === 'undefined'
  ) {
    throw new TypeError(
      'At least one of the following fields must present: "anthroponym.firstName", "anthroponym.middleName", "anthroponym.lastName".',
    );
  }

  if (typeof anthroponym.firstName !== 'undefined' && typeof anthroponym.firstName !== 'string') {
    throw new TypeError('"anthroponym.firstName" must be a string.');
  }

  if (typeof anthroponym.middleName !== 'undefined' && typeof anthroponym.middleName !== 'string') {
    throw new TypeError('"anthroponym.middleName" must be a string.');
  }

  if (typeof anthroponym.lastName !== 'undefined' && typeof anthroponym.lastName !== 'string') {
    throw new TypeError('"anthroponym.lastName" must be a string.');
  }
}
