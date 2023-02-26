import { Anthroponym } from './anthroponym-declension';
import { DeclensionInput, GenderDetectionInput } from './contracts';
import { GrammaticalGender } from './language';

/**
 * Validates if a given value is a valid input for declension.
 *
 * @throws {TypeError}
 */
export function validateDeclensionInput(input: DeclensionInput): void {
  validateObject(input);
  validateGender(input.gender);
  validateAnthroponym(input);
}

/**
 * Validates if a given value is a valid input for gender detection.
 *
 * @throws {TypeError}
 */
export function validateGenderDetectionInput(input: GenderDetectionInput): void {
  validateObject(input);
  validateAnthroponym(input);
}

/**
 * Validates if a given value is an object.
 *
 * @throws {TypeError}
 */
function validateObject(object: unknown): void {
  if (typeof object !== 'object' || object == null) {
    throw new TypeError('The input type must be an object.');
  }
}

/**
 * Validates if a given value is a valid grammatical gender.
 *
 * @throws {TypeError}
 */
function validateGender(gender: GrammaticalGender): void {
  if (![GrammaticalGender.MASCULINE, GrammaticalGender.FEMININE].includes(gender)) {
    throw new TypeError(
      `The "gender" parameter must be one of the following: "${GrammaticalGender.MASCULINE}", "${GrammaticalGender.FEMININE}".`,
    );
  }
}

/**
 * Validates if a given value is a valid anthroponym.
 *
 * @throws {TypeError}
 */
function validateAnthroponym(anthroponym: Anthroponym): void {
  if (
    typeof anthroponym.givenName === 'undefined' &&
    typeof anthroponym.patronymicName === 'undefined' &&
    typeof anthroponym.familyName === 'undefined'
  ) {
    throw new TypeError(
      'At least one of the following parameters must present: "givenName", "patronymicName", "familyName".',
    );
  }

  if (typeof anthroponym.givenName !== 'undefined' && typeof anthroponym.givenName !== 'string') {
    throw new TypeError('The "givenName" parameter must be a string.');
  }

  if (
    typeof anthroponym.patronymicName !== 'undefined' &&
    typeof anthroponym.patronymicName !== 'string'
  ) {
    throw new TypeError('The "patronymicName" parameter must be a string.');
  }

  if (typeof anthroponym.familyName !== 'undefined' && typeof anthroponym.familyName !== 'string') {
    throw new TypeError('The "familyName" parameter must be a string.');
  }
}
