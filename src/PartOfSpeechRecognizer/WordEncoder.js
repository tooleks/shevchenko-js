import NeuralNetworkParameters from './NeuralNetworkParameters';
export default class WordEncoder {
    constructor(size = NeuralNetworkParameters.InputLayerSize) {
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
//# sourceMappingURL=WordEncoder.js.map