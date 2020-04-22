import PartOfSpeech from '../Core/PartOfSpeech';
import { DIGIT_ADJECTIVE, DIGIT_NOUN } from './PartOfSpeechEncoder';
export default class PartOfSpeechDecoder {
    /**
     * Decodes an output of a neural network.
     * Returns a part of speech.
     */
    decode(input) {
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
//# sourceMappingURL=PartOfSpeechDecoder.js.map