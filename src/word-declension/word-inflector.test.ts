import { GrammaticalGender } from '../language';
import { GrammaticalCase } from '../language/grammatical-case';
import { WordInflector } from './word-inflector';

describe('WordInflector', () => {
  it('should normalize Unicode characters to NFC form for consistent pattern matching', async () => {
    const nfdForm = 'Геннадій';
    const nfcForm = 'Геннадій';

    // Verify the input is actually in NFD form (decomposed).
    expect(nfdForm).not.toEqual(nfcForm);

    const result = await new WordInflector([]).inflect(nfdForm, {
      gender: GrammaticalGender.MASCULINE,
      grammaticalCase: GrammaticalCase.NOMINATIVE,
    });

    // Verify the result is in NFC form (composed).
    expect(result).toBe(nfcForm);
  });
});
