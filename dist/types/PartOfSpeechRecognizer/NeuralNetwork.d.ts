import PartOfSpeech from '../Core/PartOfSpeech';
import NeuralNetworkTrainingData from './NeuralNetworkTrainingData';
export default class NeuralNetwork {
    private network;
    constructor();
    /**
     * Creates a neural network from JSON.
     */
    static fromJSON(structure: any): NeuralNetwork;
    /**
     * Returns a JSON representation of the neural network.
     */
    toJSON(): any;
    /**
     * Serializes the neural network to JSON string.
     */
    toString(): string;
    /**
     * Trains the neural network using a given training data.
     */
    train(trainingData: NeuralNetworkTrainingData, trainingOptions: any): NeuralNetwork;
    /**
     * Activates the neural network for a given word.
     * Returns a part of speech of a given word.
     */
    activate(word: string): PartOfSpeech;
}
//# sourceMappingURL=NeuralNetwork.d.ts.map