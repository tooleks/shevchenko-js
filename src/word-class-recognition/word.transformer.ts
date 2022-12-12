import { AlphabetEncoding, Letter } from '../language';

export class WordTransformer {
  private readonly vectorSize: number;
  private readonly unknownCharcode: number;

  constructor(vectorSize: number, unknownCharcode = 0) {
    this.vectorSize = vectorSize;
    this.unknownCharcode = unknownCharcode;
  }

  encode(word: string): Uint8Array {
    const values = new Uint8Array(this.vectorSize);

    const letters = word.slice(-this.vectorSize).toLowerCase().padStart(this.vectorSize, '-');
    for (let index = 0; index < letters.length; index += 1) {
      const letter = letters[index] as Letter;
      values[index] = AlphabetEncoding[letter] ?? this.unknownCharcode;
    }

    return values;
  }
}
