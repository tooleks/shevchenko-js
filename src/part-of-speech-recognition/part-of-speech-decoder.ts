import { DIGIT_ADJECTIVE, DIGIT_NOUN } from './part-of-speech-encoder';
import { PartOfSpeech } from './part-of-speech.enum';

export class PartOfSpeechDecoder {
  /**
   * Decodes an output of a neural network.
   * Returns a part of speech.
   */
  decode(input: number[]): PartOfSpeech {
    if (input.length !== 1) {
      throw new TypeError('Invalid input.');
    }

    const digit = input[0];

    if (Math.round(digit) === DIGIT_NOUN) {
      return PartOfSpeech.Noun;
    }

    if (Math.round(digit) === DIGIT_ADJECTIVE) {
      return PartOfSpeech.Adjective;
    }

    throw new TypeError('Invalid input.');
  }
}
