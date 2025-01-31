import { GrammaticalGender } from '../language';
import givenNamesGenders from './data/given-names-genders.json';
import { detectGender } from './detect-gender';

describe('detectGender', () => {
  describe('patronymicName', () => {
    it('should detect grammatical gender for patronymic name', () => {
      expect(detectGender({ patronymicName: 'Григорович' })).toBe(GrammaticalGender.MASCULINE);
      expect(detectGender({ patronymicName: 'Петрівна' })).toBe(GrammaticalGender.FEMININE);
    });
  });

  describe('givenName', () => {
    for (const [givenName, gender] of Object.entries(givenNamesGenders)) {
      it(`should detect grammatical gender for ${givenName}`, () => {
        expect(detectGender({ givenName })).toBe(gender);
      });
    }
  });

  it('should return null if the grammatical gender cannot be detected', () => {
    expect(detectGender({ familyName: 'Шевченко' })).toBe(null);
    expect(detectGender({ familyName: 'Косач' })).toBe(null);
  });
});
