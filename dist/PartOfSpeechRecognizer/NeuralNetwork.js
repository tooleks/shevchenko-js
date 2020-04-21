"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const synaptic = __importStar(require("synaptic"));
const WordEncoder_1 = __importDefault(require("./WordEncoder"));
const PartOfSpeechDecoder_1 = __importDefault(require("./PartOfSpeechDecoder"));
const NeuralNetworkParameters_1 = __importDefault(require("./NeuralNetworkParameters"));
const PartOfSpeechEncoder_1 = __importDefault(require("./PartOfSpeechEncoder"));
class NeuralNetwork {
    constructor() {
        this.network = new synaptic.Architect.Perceptron(NeuralNetworkParameters_1.default.InputLayerSize, NeuralNetworkParameters_1.default.HiddenLayerSize, NeuralNetworkParameters_1.default.OutputLayerSize);
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
                input: new WordEncoder_1.default().encode(word),
                output: new PartOfSpeechEncoder_1.default().encode(partOfSpeech),
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
        const input = new WordEncoder_1.default().encode(word);
        const output = this.network.activate(input);
        return new PartOfSpeechDecoder_1.default().decode(output);
    }
}
exports.default = NeuralNetwork;
//# sourceMappingURL=NeuralNetwork.js.map