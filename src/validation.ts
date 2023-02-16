import { DeclensionInput } from './contracts';
import { GrammaticalGender } from './language';

/**
 * @throws TypeError
 */
export function validateDeclensionInput(input: DeclensionInput): void {
  if (typeof input !== 'object' || input == null) {
    throw new TypeError('Input type must be an object.');
  }

  if (![GrammaticalGender.MASCULINE, GrammaticalGender.FEMININE].includes(input.gender)) {
    throw new TypeError(
      `"gender" must be one of the following: "${GrammaticalGender.MASCULINE}", "${GrammaticalGender.FEMININE}".`,
    );
  }

  if (
    typeof input.givenName === 'undefined' &&
    typeof input.patronymicName === 'undefined' &&
    typeof input.familyName === 'undefined'
  ) {
    throw new TypeError(
      'At least one of the following fields must present: "givenName", "patronymicName", "familyName".',
    );
  }

  if (typeof input.givenName !== 'undefined' && typeof input.givenName !== 'string') {
    throw new TypeError('"givenName" must be a string.');
  }

  if (typeof input.patronymicName !== 'undefined' && typeof input.patronymicName !== 'string') {
    throw new TypeError('"patronymicName" must be a string.');
  }

  if (typeof input.familyName !== 'undefined' && typeof input.familyName !== 'string') {
    throw new TypeError('"familyName" must be a string.');
  }
}
