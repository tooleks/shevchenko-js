import { DeclensionInput, GenderDetectionInput } from './contracts';
import { FieldName, getCustomFieldNames } from './extension';
import { GrammaticalGender } from './language';

export class InputValidationError extends TypeError {}

const fieldNames: FieldName[] = ['givenName', 'patronymicName', 'familyName'];

/**
 * Validates and normalizes declension input.
 *
 * Validates that the input is a valid declension input object and normalizes all string fields
 * to NFC (Canonical Decomposition followed by Canonical Composition) form to ensure Unicode
 * characters are in a consistent form for reliable pattern matching with Cyrillic characters.
 *
 * @param input - The input to validate and normalize
 * @returns A new validated and normalized input object
 * @throws {InputValidationError} If validation fails
 */
export function validateDeclensionInput<T extends DeclensionInput>(input: T): T {
  if (!isObject(input)) {
    throw new InputValidationError('The input type must be an object.');
  }

  const isGenderValid = Object.values(GrammaticalGender).includes(input.gender);

  if (!isGenderValid) {
    throw new InputValidationError(
      `The "gender" parameter must be one of the following:` +
        ` "${Object.values(GrammaticalGender).join('", "')}".`,
    );
  }

  const mergedFieldNames = [...fieldNames, ...getCustomFieldNames()];

  const hasFields = mergedFieldNames.some(
    (fieldName) => fieldName in input && typeof input[fieldName] !== 'undefined',
  );

  if (!hasFields) {
    throw new InputValidationError(
      `At least one of the following parameters must present: "${mergedFieldNames.join('", "')}".`,
    );
  }

  for (const fieldName of mergedFieldNames) {
    if (typeof input[fieldName] !== 'undefined' && typeof input[fieldName] !== 'string') {
      throw new InputValidationError(`The "${fieldName}" parameter must be a string.`);
    }
  }

  const validInput: T = { ...input };

  for (const fieldName of mergedFieldNames) {
    const fieldValue = validInput[fieldName];
    if (typeof fieldValue === 'string') {
      validInput[fieldName] = fieldValue.normalize('NFC');
    }
  }

  return validInput;
}

/**
 * Validates and normalizes gender detection input.
 *
 * Validates that the input is a valid gender detection input object and normalizes all string
 * fields to NFC (Canonical Decomposition followed by Canonical Composition) form to ensure
 * Unicode characters are in a consistent form for reliable pattern matching with Cyrillic characters.
 *
 * @param input - The input to validate and normalize
 * @returns A new validated and normalized input object
 * @throws {InputValidationError} If validation fails
 */
export function validateGenderDetectionInput<T extends GenderDetectionInput>(input: T): T {
  if (!isObject(input)) {
    throw new InputValidationError('The input type must be an object.');
  }

  const hasFields = fieldNames.some(
    (fieldName) => fieldName in input && typeof input[fieldName] !== 'undefined',
  );

  if (!hasFields) {
    throw new InputValidationError(
      `At least one of the following parameters must present: "${fieldNames.join('", "')}".`,
    );
  }

  for (const fieldName of fieldNames) {
    if (typeof input[fieldName] !== 'undefined' && typeof input[fieldName] !== 'string') {
      throw new InputValidationError(`The "${fieldName}" parameter must be a string.`);
    }
  }

  const validInput: T = { ...input };

  for (const fieldName of fieldNames) {
    const fieldValue = validInput[fieldName];
    if (typeof fieldValue === 'string') {
      validInput[fieldName] = fieldValue.normalize('NFC');
    }
  }

  return validInput;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value != null;
}
