import { WordClass } from '../../language';
import { FamilyNameClass } from './family-name-class';

export class FamilyNameClassTransformer {
  encode(familyNameCategory: FamilyNameClass): Uint8Array {
    const values = new Uint8Array(1);

    switch (familyNameCategory.wordClass) {
      case WordClass.NOUN:
        values[0] = 1;
        break;
      case WordClass.ADJECTIVE:
        values[0] = 0;
        break;
      default:
        throw new TypeError(`Invalid word class: "${familyNameCategory.wordClass}".`);
    }

    return values;
  }

  decode(values: Uint8Array | Int32Array | Float32Array): FamilyNameClass {
    if (values.length < 1 || values.length > 1) {
      throw new RangeError('Invalid vector length.');
    }

    const value = values[0];

    if (value < 0 || value > 1) {
      throw new RangeError('Invalid vector value.');
    }

    const wordClass = value >= 0.5 ? WordClass.NOUN : WordClass.ADJECTIVE;

    return { wordClass };
  }
}
