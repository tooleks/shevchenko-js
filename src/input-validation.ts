import { DeclensionInput, GenderDetectionInput } from './contracts';
import { FieldName, getCustomFieldNames } from './extension';
import { GrammaticalGender } from './language';

export class InputValidationError extends TypeError {}

const fieldNames: FieldName[] = ['givenName', 'patronymicName', 'familyName'];

/**
 * Validates if a given value is a valid input for declension.
 *
 * @throws {InputValidationError}
 */
export function validateDeclensionInput(input: unknown): asserts input is DeclensionInput {
  if (!isObject(input)) {
    throw new InputValidationError('The input type must be an object.');
  }

  const isGenderValid = Object.values(GrammaticalGender).includes(
    input.gender as GrammaticalGender,
  );

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
}

/**
 * Validates if a given value is a valid input for gender detection.
 *
 * @throws {InputValidationError}
 */
export function validateGenderDetectionInput(
  input: unknown,
): asserts input is GenderDetectionInput {
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
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value != null;
}
