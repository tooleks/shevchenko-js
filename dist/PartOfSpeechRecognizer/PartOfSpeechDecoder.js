"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PartOfSpeech_1 = __importDefault(require("../Core/PartOfSpeech"));
const PartOfSpeechEncoder_1 = require("./PartOfSpeechEncoder");
class PartOfSpeechDecoder {
    /**
     * Decodes an output of a neural network.
     * Returns a part of speech.
     */
    decode(input) {
        if (input.length !== 1) {
            throw new TypeError('Invalid input.');
        }
        const digit = input[0];
        if (Math.round(digit) === PartOfSpeechEncoder_1.DIGIT_NOUN) {
            return PartOfSpeech_1.default.Noun;
        }
        if (Math.round(digit) === PartOfSpeechEncoder_1.DIGIT_ADJECTIVE) {
            return PartOfSpeech_1.default.Adjective;
        }
        throw new TypeError('Invalid input.');
    }
}
exports.default = PartOfSpeechDecoder;
//# sourceMappingURL=PartOfSpeechDecoder.js.map