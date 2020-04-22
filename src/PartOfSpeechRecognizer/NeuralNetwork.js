import * as synaptic from 'synaptic';
import WordEncoder from './WordEncoder';
import PartOfSpeechDecoder from './PartOfSpeechDecoder';
import NeuralNetworkParameters from './NeuralNetworkParameters';
import PartOfSpeechEncoder from './PartOfSpeechEncoder';
export default class NeuralNetwork {
    constructor() {
        this.network = new synaptic.Architect.Perceptron(NeuralNetworkParameters.InputLayerSize, NeuralNetworkParameters.HiddenLayerSize, NeuralNetworkParameters.OutputLayerSize);
    }
    /**
     * Creates a neural network from JSON.
     */
    static fromJSON(structure) {
        const instance = new this();
        instance.network = synaptic.Network.fromJSON(structure);
        return instance;
    }
    /**
     * Returns a JSON representation of the neural network.
     */
    toJSON() {
        return this.network.toJSON();
    }
    /**
     * Serializes the neural network to JSON string.
     */
    toString() {
        return JSON.stringify(this.toJSON());
    }
    /**
     * Trains the neural network using a given training data.
     */
    train(trainingData, trainingOptions) {
        const trainingSet = Object.entries(trainingData).map(([word, partOfSpeech]) => {
            return {
                input: new WordEncoder().encode(word),
                output: new PartOfSpeechEncoder().encode(partOfSpeech),
            };
        });
        new synaptic.Trainer(this.network).train(trainingSet, trainingOptions);
        return this;
    }
    /**
     * Activates the neural network for a given word.
     * Returns a part of speech of a given word.
     */
    activate(word) {
        const input = new WordEncoder().encode(word);
        const output = this.network.activate(input);
        return new PartOfSpeechDecoder().decode(output);
    }
}
//# sourceMappingURL=NeuralNetwork.js.map