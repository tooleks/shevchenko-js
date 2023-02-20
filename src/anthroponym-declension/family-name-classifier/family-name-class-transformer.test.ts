import { WordClass } from '../../language';
import { FamilyNameClass } from './family-name-class';
import { FamilyNameClassTransformer } from './family-name-class-transformer';

const MIN_VAL = 1e-7;

describe('FamilyNameClassTransformer', () => {
  describe('encode', () => {
    it('should encode a noun word class', () => {
      const familyNameClassTransformer = new FamilyNameClassTransformer();

      const familyNameClass: FamilyNameClass = {
        wordClass: WordClass.NOUN,
      };

      const result = familyNameClassTransformer.encode(familyNameClass);

      expect(Array.from(result)).toStrictEqual([1]);
    });

    it('should encode an adjective word class', () => {
      const familyNameClassTransformer = new FamilyNameClassTransformer();

      const familyNameClass: FamilyNameClass = {
        wordClass: WordClass.ADJECTIVE,
      };

      const result = familyNameClassTransformer.encode(familyNameClass);

      expect(Array.from(result)).toStrictEqual([0]);
    });

    it('should throw a type error', () => {
      const familyNameClassTransformer = new FamilyNameClassTransformer();

      const familyNameClass: FamilyNameClass = {
        wordClass: 'verb' as WordClass,
      };

      expect(() => familyNameClassTransformer.encode(familyNameClass)).toThrow(TypeError);
    });
  });

  describe('decode', () => {
    it('should decode a noun word class', () => {
      const familyNameClassTransformer = new FamilyNameClassTransformer();

      const result = familyNameClassTransformer.decode(Float32Array.from([0.5]));

      expect(result).toStrictEqual({ wordClass: WordClass.NOUN });
    });

    it('should decode a noun word class', () => {
      const familyNameClassTransformer = new FamilyNameClassTransformer();

      const result = familyNameClassTransformer.decode(Float32Array.from([1]));

      expect(result).toStrictEqual({ wordClass: WordClass.NOUN });
    });

    it('should decode an adjective word class', () => {
      const familyNameClassTransformer = new FamilyNameClassTransformer();

      const result = familyNameClassTransformer.decode(Float32Array.from([0]));

      expect(result).toStrictEqual({ wordClass: WordClass.ADJECTIVE });
    });

    it('should decode an adjective word class', () => {
      const familyNameClassTransformer = new FamilyNameClassTransformer();

      const result = familyNameClassTransformer.decode(Float32Array.from([0.5 - MIN_VAL]));

      expect(result).toStrictEqual({ wordClass: WordClass.ADJECTIVE });
    });

    it('should throw a range error', () => {
      const familyNameClassTransformer = new FamilyNameClassTransformer();

      expect(() => familyNameClassTransformer.decode(Float32Array.from([0, 1]))).toThrow(
        RangeError,
      );
    });

    it('should throw a range error', () => {
      const familyNameClassTransformer = new FamilyNameClassTransformer();

      expect(() => familyNameClassTransformer.decode(Float32Array.from([0 - MIN_VAL]))).toThrow(
        RangeError,
      );
      expect(() => familyNameClassTransformer.decode(Float32Array.from([1 + MIN_VAL]))).toThrow(
        RangeError,
      );
    });
  });
});
