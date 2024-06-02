/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DeclensionInput } from './contracts';
import {
  InputValidationError,
  validateDeclensionInput,
  validateGenderDetectionInput,
} from './input-validation';

describe('validateDeclensionInput', () => {
  it('should throw an input validation error when called with empty arguments list', () => {
    // @ts-ignore
    expect(() => validateDeclensionInput()).toThrow(
      new InputValidationError('The input type must be an object.'),
    );
  });

  it('should throw an input validation error if unsupported gender provided', () => {
    // @ts-ignore
    const input = {
      gender: 'animate',
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(() => validateDeclensionInput(input)).toThrow(
      new InputValidationError(
        'The "gender" parameter must be one of the following: "masculine", "feminine".',
      ),
    );
  });

  it('should throw an error if none of the name parameters provided', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
    } as DeclensionInput;

    expect(() => validateDeclensionInput(input)).toThrow(
      new InputValidationError(
        'At least one of the following parameters must present: "givenName", "patronymicName", "familyName".',
      ),
    );
  });

  it('should throw an error if provided given name is not a string', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      givenName: null,
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(() => validateDeclensionInput(input)).toThrow(
      new InputValidationError('The "givenName" parameter must be a string.'),
    );
  });

  it('should throw an error if provided patronymic name is not a string', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      givenName: 'Тарас',
      patronymicName: null,
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(() => validateDeclensionInput(input)).toThrow(
      new InputValidationError('The "patronymicName" parameter must be a string.'),
    );
  });

  it('should throw an error if provided family name is not a string', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: null,
    } as DeclensionInput;

    expect(() => validateDeclensionInput(input)).toThrow(
      new InputValidationError('The "familyName" parameter must be a string.'),
    );
  });

  it('should pass the validation if a given name provided', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      givenName: 'Тарас',
    } as DeclensionInput;

    expect(validateDeclensionInput(input)).toBe(undefined);
  });

  it('should pass the validation if a patronymic name provided', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      patronymicName: 'Григорович',
    } as DeclensionInput;

    expect(validateDeclensionInput(input)).toBe(undefined);
  });

  it('should pass the validation if a family name provided', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(validateDeclensionInput(input)).toBe(undefined);
  });

  it('should pass the validation if a full name provided', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(validateDeclensionInput(input)).toBe(undefined);
  });
});

describe('validateGenderDetectionInput', () => {
  it('should throw an input validation error when called with empty arguments list', () => {
    // @ts-ignore
    expect(() => validateGenderDetectionInput()).toThrow(
      new InputValidationError('The input type must be an object.'),
    );
  });

  it('should throw an error if none of the name parameters provided', () => {
    // @ts-ignore
    const input = {} as DeclensionInput;

    expect(() => validateGenderDetectionInput(input)).toThrow(
      new InputValidationError(
        'At least one of the following parameters must present: "givenName", "patronymicName", "familyName".',
      ),
    );
  });

  it('should throw an error if provided given name is not a string', () => {
    // @ts-ignore
    const input = {
      givenName: null,
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(() => validateGenderDetectionInput(input)).toThrow(
      new InputValidationError('The "givenName" parameter must be a string.'),
    );
  });

  it('should throw an error if provided patronymic name is not a string', () => {
    // @ts-ignore
    const input = {
      givenName: 'Тарас',
      patronymicName: null,
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(() => validateGenderDetectionInput(input)).toThrow(
      new InputValidationError('The "patronymicName" parameter must be a string.'),
    );
  });

  it('should throw an error if provided family name is not a string', () => {
    // @ts-ignore
    const input = {
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: null,
    } as DeclensionInput;

    expect(() => validateGenderDetectionInput(input)).toThrow(
      new InputValidationError('The "familyName" parameter must be a string.'),
    );
  });

  it('should pass the validation if a given name provided', () => {
    // @ts-ignore
    const input = {
      givenName: 'Тарас',
    } as DeclensionInput;

    expect(validateGenderDetectionInput(input)).toBe(undefined);
  });

  it('should pass the validation if a patronymic name provided', () => {
    // @ts-ignore
    const input = {
      patronymicName: 'Григорович',
    } as DeclensionInput;

    expect(validateGenderDetectionInput(input)).toBe(undefined);
  });

  it('should pass the validation if a family name provided', () => {
    // @ts-ignore
    const input = {
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(validateGenderDetectionInput(input)).toBe(undefined);
  });

  it('should pass the validation if a full name provided', () => {
    // @ts-ignore
    const input = {
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(validateGenderDetectionInput(input)).toBe(undefined);
  });
});
