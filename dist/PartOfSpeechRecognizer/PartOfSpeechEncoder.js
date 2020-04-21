"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PartOfSpeech_1 = __importDefault(require("../Core/PartOfSpeech"));
exports.DIGIT_NOUN = 0;
exports.DIGIT_ADJECTIVE = 1;
class PartOfSpeechEncoder {
    /**
     * Encodes a part of speech for use in the neural network.
     */
    encode(input) {
        switch (input) {
            case PartOfSpeech_1.default.Noun:
                return [exports.DIGIT_NOUN];
            case PartOfSpeech_1.default.Adjective:
                return [exports.DIGIT_ADJECTIVE];
            default:
                throw new TypeError(`Invalid input.`);
        }
    }
}
exports.default = PartOfSpeechEncoder;
//# sourceMappingURL=PartOfSpeechEncoder.js.map