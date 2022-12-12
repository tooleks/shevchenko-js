import { WordClass } from '../language';

export class WordClassTransformer {
  encode(wordClass: WordClass): Uint8Array {
    const values = new Uint8Array(1);

    switch (wordClass) {
      case WordClass.NOUN:
        values[0] = 1;
        break;
      case WordClass.ADJECTIVE:
        values[0] = 0;
        break;
      default:
        throw new TypeError(`Invalid word class: "${wordClass}".`);
    }

    return values;
  }

  decode(values: Uint8Array | Int32Array | Float32Array): WordClass {
    if (values.length < 1 || values.length > 1) {
      throw new RangeError('Invalid vector length.');
    }

    const value = values[0];

    if (value < 0 || value > 1) {
      throw new RangeError('Invalid vector value.');
    }

    if (value >= 0.5) {
      return WordClass.NOUN;
    } else {
      return WordClass.ADJECTIVE;
    }
  }
}
