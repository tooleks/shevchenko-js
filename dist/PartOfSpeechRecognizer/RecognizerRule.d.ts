import PartOfSpeech from '../Core/PartOfSpeech';
import Gender from '../Core/Gender';
import NeuralNetwork from './NeuralNetwork';
import NeuralNetworkTrainingData from './NeuralNetworkTrainingData';
export interface RecognizerCondition {
    (word: string, gender: Gender): boolean;
}
export default class RecognizerRule {
    readonly condition: RecognizerCondition;
    readonly cache: NeuralNetworkTrainingData;
    private readonly neuralNetwork;
    constructor(condition: RecognizerCondition, neuralNetwork: NeuralNetwork, cache: NeuralNetworkTrainingData);
    /**
     * Applies the part of speech recognizer rule to a given word.
     * Returns a part of speech of a given word.
     * Returns null if a part of speech was not recognized.
     */
    apply(word: string): PartOfSpeech;
}
