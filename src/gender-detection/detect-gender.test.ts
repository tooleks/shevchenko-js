import { GrammaticalGender } from '../language';
import { detectGender } from './detect-gender';

describe('detectGender', () => {
  it('should return the grammatical gender', () => {
    expect(detectGender({ givenName: 'Тарас' })).toBe(GrammaticalGender.MASCULINE);
    expect(detectGender({ patronymicName: 'Григорович' })).toBe(GrammaticalGender.MASCULINE);
    expect(detectGender({ givenName: 'Тарас', patronymicName: 'Григорович' })).toBe(
      GrammaticalGender.MASCULINE,
    );
    expect(detectGender({ givenName: 'Лариса', patronymicName: 'Григорович' })).toBe(
      GrammaticalGender.MASCULINE,
    );
    expect(detectGender({ givenName: 'Лариса' })).toBe(GrammaticalGender.FEMININE);
    expect(detectGender({ patronymicName: 'Петрівна' })).toBe(GrammaticalGender.FEMININE);
    expect(detectGender({ givenName: 'Лариса', patronymicName: 'Петрівна' })).toBe(
      GrammaticalGender.FEMININE,
    );
    expect(detectGender({ givenName: 'Тарас', patronymicName: 'Петрівна' })).toBe(
      GrammaticalGender.FEMININE,
    );
  });

  it('should return null if the grammatical gender cannot be detected', () => {
    expect(detectGender({ familyName: 'Шевченко' })).toBe(null);
    expect(detectGender({ familyName: 'Косач' })).toBe(null);
    expect(detectGender({ givenName: 'Тара' })).toBe(null);
    expect(detectGender({ givenName: 'Лара' })).toBe(null);
  });
});
