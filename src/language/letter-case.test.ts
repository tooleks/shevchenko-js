import { copyLetterCase } from './letter-case';

describe('copyLetterCase', () => {
  it('should copy a letter case from the given word', () => {
    expect(copyLetterCase('Шевченко', 'шевченкові')).toBe('Шевченкові');
    expect(copyLetterCase('ШЕВЧЕНКО', 'шевченкові')).toBe('ШЕВЧЕНКОВІ');
    expect(copyLetterCase('шевченко', 'ШЕВЧЕНКОВІ')).toBe('шевченкові');
  });
});
