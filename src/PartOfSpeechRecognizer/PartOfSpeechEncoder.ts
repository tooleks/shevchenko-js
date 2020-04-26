import PartOfSpeech from './PartOfSpeech';

export const DIGIT_NOUN = 0;
export const DIGIT_ADJECTIVE = 1;

export default class PartOfSpeechEncoder {
  /**
   * Encodes a part of speech for use in the neural network.
   */
  encode(input: PartOfSpeech): number[] {
    switch (input) {
      case PartOfSpeech.Noun:
        return [DIGIT_NOUN];
      case PartOfSpeech.Adjective:
        return [DIGIT_ADJECTIVE];
      default:
        throw new TypeError('Invalid input.');
    }
  }
}
