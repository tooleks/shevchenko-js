/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DeclensionInput, GenderDetectionInput } from './contracts';
import {
  InputValidationError,
  validateDeclensionInput,
  validateGenderDetectionInput,
} from './input-validation';
import { GrammaticalGender } from './language';

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

    expect(() => validateDeclensionInput(input)).not.toThrow();
  });

  it('should pass the validation if a patronymic name provided', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      patronymicName: 'Григорович',
    } as DeclensionInput;

    expect(() => validateDeclensionInput(input)).not.toThrow();
  });

  it('should pass the validation if a family name provided', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(() => validateDeclensionInput(input)).not.toThrow();
  });

  it('should pass the validation if a full name provided', () => {
    // @ts-ignore
    const input = {
      gender: 'masculine',
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(() => validateDeclensionInput(input)).not.toThrow();
  });

  describe('return value', () => {
    it('should return a new object with the same properties', () => {
      const input = {
        gender: GrammaticalGender.MASCULINE,
        givenName: 'Тарас',
        patronymicName: 'Григорович',
        familyName: 'Шевченко',
      };

      const result = validateDeclensionInput(input);

      expect(result).not.toBe(input);
      expect(result).toEqual(input);
    });

    it('should return object with normalized gender', () => {
      const input = {
        gender: GrammaticalGender.FEMININE,
        givenName: 'Леся',
      };

      const result = validateDeclensionInput(input);

      expect(result.gender).toBe(GrammaticalGender.FEMININE);
    });

    it('should preserve all provided name fields', () => {
      const input = {
        gender: GrammaticalGender.MASCULINE,
        givenName: 'Тарас',
        patronymicName: 'Григорович',
        familyName: 'Шевченко',
      };

      const result = validateDeclensionInput(input);

      expect(result.givenName).toBe('Тарас');
      expect(result.patronymicName).toBe('Григорович');
      expect(result.familyName).toBe('Шевченко');
    });

    it('should preserve undefined fields as undefined', () => {
      const input: DeclensionInput = {
        gender: GrammaticalGender.MASCULINE,
        givenName: 'Тарас',
      };

      const result = validateDeclensionInput(input);

      expect(result.givenName).toBe('Тарас');
      expect(result.patronymicName).toBeUndefined();
      expect(result.familyName).toBeUndefined();
    });
  });

  describe('value normalization', () => {
    const nfdForm = {
      givenName: 'Геннадій',
      patronymicName: 'Валерійович',
      familyName: 'Чорний',
    };

    const nfcForm = {
      givenName: 'Геннадій',
      patronymicName: 'Валерійович',
      familyName: 'Чорний',
    };

    it('should have different NFD and NFC forms', () => {
      expect(nfdForm.givenName).not.toBe(nfcForm.givenName);
      expect(nfdForm.patronymicName).not.toBe(nfcForm.patronymicName);
      expect(nfdForm.familyName).not.toBe(nfcForm.familyName);
    });

    it('should normalize givenName to NFC form', () => {
      const input = {
        gender: GrammaticalGender.MASCULINE,
        givenName: nfdForm.givenName,
      };

      const result = validateDeclensionInput(input);

      expect(result.givenName).toBe(nfcForm.givenName);
    });

    it('should normalize patronymicName to NFC form', () => {
      const input = {
        gender: GrammaticalGender.MASCULINE,
        patronymicName: nfdForm.patronymicName,
      };

      const result = validateDeclensionInput(input);

      expect(result.patronymicName).toBe(nfcForm.patronymicName);
    });

    it('should normalize familyName to NFC form', () => {
      const input = {
        gender: GrammaticalGender.MASCULINE,
        familyName: nfdForm.familyName,
      };

      const result = validateDeclensionInput(input);

      expect(result.familyName).toBe(nfcForm.familyName);
    });

    it('should normalize all name fields simultaneously', () => {
      const input = {
        gender: GrammaticalGender.FEMININE,
        givenName: nfdForm.givenName,
        patronymicName: nfdForm.patronymicName,
        familyName: nfdForm.familyName,
      };

      const result = validateDeclensionInput(input);

      expect(result.givenName).toBe(nfcForm.givenName);
      expect(result.patronymicName).toBe(nfcForm.patronymicName);
      expect(result.familyName).toBe(nfcForm.familyName);
    });

    it('should handle already normalized strings', () => {
      const input = {
        gender: GrammaticalGender.MASCULINE,
        givenName: nfcForm.givenName,
        patronymicName: nfcForm.patronymicName,
        familyName: nfcForm.familyName,
      };

      const result = validateDeclensionInput(input);

      expect(result.givenName).toBe(nfcForm.givenName);
      expect(result.patronymicName).toBe(nfcForm.patronymicName);
      expect(result.familyName).toBe(nfcForm.familyName);
    });

    it('should not normalize undefined fields', () => {
      const input: DeclensionInput = {
        gender: GrammaticalGender.MASCULINE,
        givenName: nfdForm.givenName,
      };

      const result = validateDeclensionInput(input);

      expect(result.givenName).toBe(nfcForm.givenName);
      expect(result.patronymicName).toBeUndefined();
      expect(result.familyName).toBeUndefined();
    });
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

    expect(() => validateGenderDetectionInput(input)).not.toThrow();
  });

  it('should pass the validation if a patronymic name provided', () => {
    // @ts-ignore
    const input = {
      patronymicName: 'Григорович',
    } as DeclensionInput;

    expect(() => validateGenderDetectionInput(input)).not.toThrow();
  });

  it('should pass the validation if a family name provided', () => {
    // @ts-ignore
    const input = {
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(() => validateGenderDetectionInput(input)).not.toThrow();
  });

  it('should pass the validation if a full name provided', () => {
    // @ts-ignore
    const input = {
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    } as DeclensionInput;

    expect(() => validateGenderDetectionInput(input)).not.toThrow();
  });

  describe('return value', () => {
    it('should return a new object with the same properties', () => {
      const input = {
        givenName: 'Тарас',
        patronymicName: 'Григорович',
        familyName: 'Шевченко',
      };

      const result = validateGenderDetectionInput(input);

      expect(result).not.toBe(input);
      expect(result).toEqual(input);
    });

    it('should preserve all provided name fields', () => {
      const input = {
        givenName: 'Тарас',
        patronymicName: 'Григорович',
        familyName: 'Шевченко',
      };

      const result = validateGenderDetectionInput(input);

      expect(result.givenName).toBe('Тарас');
      expect(result.patronymicName).toBe('Григорович');
      expect(result.familyName).toBe('Шевченко');
    });

    it('should preserve undefined fields as undefined', () => {
      const input: GenderDetectionInput = {
        givenName: 'Тарас',
      };

      const result = validateGenderDetectionInput(input);

      expect(result.givenName).toBe('Тарас');
      expect(result.patronymicName).toBeUndefined();
      expect(result.familyName).toBeUndefined();
    });
  });

  describe('value normalization', () => {
    const nfdForm = {
      givenName: 'Геннадій',
      patronymicName: 'Валерійович',
      familyName: 'Чорний',
    };

    const nfcForm = {
      givenName: 'Геннадій',
      patronymicName: 'Валерійович',
      familyName: 'Чорний',
    };

    it('should have different NFD and NFC forms', () => {
      expect(nfdForm.givenName).not.toBe(nfcForm.givenName);
      expect(nfdForm.patronymicName).not.toBe(nfcForm.patronymicName);
      expect(nfdForm.familyName).not.toBe(nfcForm.familyName);
    });

    it('should normalize givenName to NFC form', () => {
      const input = {
        givenName: nfdForm.givenName,
      };

      const result = validateGenderDetectionInput(input);

      expect(result.givenName).toBe(nfcForm.givenName);
    });

    it('should normalize patronymicName to NFC form', () => {
      const input = {
        patronymicName: nfdForm.patronymicName,
      };

      const result = validateGenderDetectionInput(input);

      expect(result.patronymicName).toBe(nfcForm.patronymicName);
    });

    it('should normalize familyName to NFC form', () => {
      const input = {
        familyName: nfdForm.familyName,
      };

      const result = validateGenderDetectionInput(input);

      expect(result.familyName).toBe(nfcForm.familyName);
    });

    it('should normalize all name fields simultaneously', () => {
      const input = {
        givenName: nfdForm.givenName,
        patronymicName: nfdForm.patronymicName,
        familyName: nfdForm.familyName,
      };

      const result = validateGenderDetectionInput(input);

      expect(result.givenName).toBe(nfcForm.givenName);
      expect(result.patronymicName).toBe(nfcForm.patronymicName);
      expect(result.familyName).toBe(nfcForm.familyName);
    });

    it('should handle already normalized strings', () => {
      const input = {
        givenName: nfcForm.givenName,
        patronymicName: nfcForm.patronymicName,
        familyName: nfcForm.familyName,
      };

      const result = validateGenderDetectionInput(input);

      expect(result.givenName).toBe(nfcForm.givenName);
      expect(result.patronymicName).toBe(nfcForm.patronymicName);
      expect(result.familyName).toBe(nfcForm.familyName);
    });

    it('should not normalize undefined fields', () => {
      const input: GenderDetectionInput = {
        givenName: nfdForm.givenName,
      };

      const result = validateGenderDetectionInput(input);

      expect(result.givenName).toBe(nfcForm.givenName);
      expect(result.patronymicName).toBeUndefined();
      expect(result.familyName).toBeUndefined();
    });
  });
});
