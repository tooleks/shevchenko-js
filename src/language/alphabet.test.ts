import { ALPHABET_SIZE, AlphabetEncoding } from './alphabet';

describe('AlphabetEncoding', () => {
  it('should encode the alphabet letters from 1 to 33', () => {
    expect(AlphabetEncoding['а']).toBe(1);
    expect(AlphabetEncoding['я']).toBe(33);
  });
});

describe('ALPHABET_SIZE', () => {
  it('should equal to the size of the alphabet', () => {
    expect(ALPHABET_SIZE).toBe(33);
  });
});
