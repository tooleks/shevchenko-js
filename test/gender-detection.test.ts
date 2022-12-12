import * as shevchenko from '../src';

describe('gender detection', () => {
  it('should return the grammatical gender', () => {
    expect(shevchenko.detectGender({ firstName: 'Тарас' })).toBe(shevchenko.Gender.Male);
    expect(shevchenko.detectGender({ middleName: 'Григорович' })).toBe(shevchenko.Gender.Male);
    expect(shevchenko.detectGender({ firstName: 'Тарас', middleName: 'Григорович' })).toBe(
      shevchenko.Gender.Male,
    );
    expect(shevchenko.detectGender({ firstName: 'Лариса', middleName: 'Григорович' })).toBe(
      shevchenko.Gender.Male,
    );
    expect(shevchenko.detectGender({ firstName: 'Лариса' })).toBe(shevchenko.Gender.Female);
    expect(shevchenko.detectGender({ middleName: 'Петрівна' })).toBe(shevchenko.Gender.Female);
    expect(shevchenko.detectGender({ firstName: 'Лариса', middleName: 'Петрівна' })).toBe(
      shevchenko.Gender.Female,
    );
    expect(shevchenko.detectGender({ firstName: 'Тарас', middleName: 'Петрівна' })).toBe(
      shevchenko.Gender.Female,
    );
  });

  it('should return null if the grammatical gender cannot be detected', () => {
    expect(shevchenko.detectGender({ lastName: 'Шевченко' })).toBe(null);
    expect(shevchenko.detectGender({ lastName: 'Косач' })).toBe(null);
    expect(shevchenko.detectGender({ firstName: 'Тара' })).toBe(null);
    expect(shevchenko.detectGender({ firstName: 'Лара' })).toBe(null);
  });
});
