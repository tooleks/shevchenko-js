import { WordClass } from '../language';
import { WordClassTransformer } from './word-class-transformer';

const MIN_VAL = 1e-7;

describe('WordClassTransformer', () => {
  describe('encode', () => {
    it('should encode a noun word class', () => {
      const wordClassTransformer = new WordClassTransformer();

      const result = wordClassTransformer.encode(WordClass.NOUN);

      expect(Array.from(result)).toStrictEqual([1]);
    });

    it('should encode an adjective word class', () => {
      const wordClassTransformer = new WordClassTransformer();

      const result = wordClassTransformer.encode(WordClass.ADJECTIVE);

      expect(Array.from(result)).toStrictEqual([0]);
    });

    it('should throw a type error', () => {
      const wordClassTransformer = new WordClassTransformer();

      expect(() => wordClassTransformer.encode('verb' as WordClass)).toThrow(TypeError);
    });
  });

  describe('decode', () => {
    it('should decode a noun word class', () => {
      const wordClassTransformer = new WordClassTransformer();

      const result = wordClassTransformer.decode(Float32Array.from([0.5]));

      expect(result).toBe(WordClass.NOUN);
    });

    it('should decode a noun word class', () => {
      const wordClassTransformer = new WordClassTransformer();

      const result = wordClassTransformer.decode(Float32Array.from([1]));

      expect(result).toBe(WordClass.NOUN);
    });

    it('should decode an adjective word class', () => {
      const wordClassTransformer = new WordClassTransformer();

      const result = wordClassTransformer.decode(Float32Array.from([0]));

      expect(result).toBe(WordClass.ADJECTIVE);
    });

    it('should decode an adjective word class', () => {
      const wordClassTransformer = new WordClassTransformer();

      const result = wordClassTransformer.decode(Float32Array.from([0.5 - MIN_VAL]));

      expect(result).toBe(WordClass.ADJECTIVE);
    });

    it('should throw a range error', () => {
      const wordClassTransformer = new WordClassTransformer();

      expect(() => wordClassTransformer.decode(Float32Array.from([0, 1]))).toThrow(RangeError);
    });

    it('should throw a range error', () => {
      const wordClassTransformer = new WordClassTransformer();

      expect(() => wordClassTransformer.decode(Float32Array.from([0 - MIN_VAL]))).toThrow(
        RangeError,
      );
      expect(() => wordClassTransformer.decode(Float32Array.from([1 + MIN_VAL]))).toThrow(
        RangeError,
      );
    });
  });
});
