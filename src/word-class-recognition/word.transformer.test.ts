import { WordTransformer } from './word.transformer';

describe('WordTransformer', () => {
  describe('encode', () => {
    it('should encode into the same size vector', () => {
      const word = 'шевченко';

      const wordTransformer = new WordTransformer(word.length);

      const result = wordTransformer.encode(word);

      expect(Array.from(result)).toStrictEqual([29, 7, 3, 28, 7, 18, 15, 19]);
    });

    it('should encode into a larger size vector', () => {
      const word = 'шевченко';

      const wordTransformer = new WordTransformer(word.length + 5);

      const result = wordTransformer.encode(word);

      expect(Array.from(result)).toStrictEqual([0, 0, 0, 0, 0, 29, 7, 3, 28, 7, 18, 15, 19]);
    });

    it('should encode into a smaller size vector', () => {
      const word = 'шевченко';

      const wordTransformer = new WordTransformer(word.length - 5);

      const result = wordTransformer.encode(word);

      expect(Array.from(result)).toStrictEqual([18, 15, 19]);
    });

    it('should ignore letter case', () => {
      const word = 'шевченко';

      const wordTransformer = new WordTransformer(word.length);

      expect(wordTransformer.encode(word)).toStrictEqual(
        wordTransformer.encode(word.toUpperCase()),
      );
    });
  });
});
