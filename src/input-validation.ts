import { DeclensionInput, GenderDetectionInput } from './contracts';
import { GrammaticalGender } from './language';

export class InputValidationError extends TypeError {}

/**
 * Validates if a given value is a valid input for declension.
 *
 * @throws {InputValidationError}
 */
export function validateDeclensionInput(value: unknown): asserts value is DeclensionInput {
  if (!isObject(value)) {
    throw new InputValidationError('The input type must be an object.');
  }

  if (!isIn(value.gender, Object.values(GrammaticalGender))) {
    throw new InputValidationError(
      `The "gender" parameter must be one of the following: "${GrammaticalGender.MASCULINE}", "${GrammaticalGender.FEMININE}".`,
    );
  }

  if (
    !isDefined(value.givenName) &&
    !isDefined(value.patronymicName) &&
    !isDefined(value.familyName)
  ) {
    throw new InputValidationError(
      'At least one of the following parameters must present: "givenName", "patronymicName", "familyName".',
    );
  }

  if (isDefined(value.givenName) && !isString(value.givenName)) {
    throw new InputValidationError('The "givenName" parameter must be a string.');
  }

  if (isDefined(value.patronymicName) && !isString(value.patronymicName)) {
    throw new InputValidationError('The "patronymicName" parameter must be a string.');
  }

  if (isDefined(value.familyName) && !isString(value.familyName)) {
    throw new InputValidationError('The "familyName" parameter must be a string.');
  }
}

/**
 * Validates if a given value is a valid input for gender detection.
 *
 * @throws {InputValidationError}
 */
export function validateGenderDetectionInput(
  value: unknown,
): asserts value is GenderDetectionInput {
  if (!isObject(value)) {
    throw new InputValidationError('The input type must be an object.');
  }

  if (
    !isDefined(value.givenName) &&
    !isDefined(value.patronymicName) &&
    !isDefined(value.familyName)
  ) {
    throw new InputValidationError(
      'At least one of the following parameters must present: "givenName", "patronymicName", "familyName".',
    );
  }

  if (isDefined(value.givenName) && !isString(value.givenName)) {
    throw new InputValidationError('The "givenName" parameter must be a string.');
  }

  if (isDefined(value.patronymicName) && !isString(value.patronymicName)) {
    throw new InputValidationError('The "patronymicName" parameter must be a string.');
  }

  if (isDefined(value.familyName) && !isString(value.familyName)) {
    throw new InputValidationError('The "familyName" parameter must be a string.');
  }
}

function isDefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === 'object';
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isIn<T>(value: unknown, values: T[]): value is T {
  return values.includes(value as T);
}
