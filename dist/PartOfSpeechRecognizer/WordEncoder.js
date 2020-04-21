"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NeuralNetworkParameters_1 = __importDefault(require("./NeuralNetworkParameters"));
class WordEncoder {
    constructor(size = NeuralNetworkParameters_1.default.InputLayerSize) {
        this.size = size;
    }
    /**
     * Encodes a word for use in the neural network.
     */
    encode(input) {
        return input
            .toLowerCase()
            .split('')
            .map(char => char.charCodeAt(0).toString(2))
            .join('')
            .padStart(this.size, '0')
            .split('')
            .map(digit => Number.parseInt(digit, 2));
    }
}
exports.default = WordEncoder;
//# sourceMappingURL=WordEncoder.js.map