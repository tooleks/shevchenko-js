import PartOfSpeech from '../Core/PartOfSpeech';
import Gender from '../Core/Gender';
import NeuralNetwork from './NeuralNetwork';
import RecognizerCache from './RecognizerCache';

export interface RecognizerCondition {
  (word: string, gender: Gender): boolean;
}

export default class RecognizerRule {
  readonly condition: RecognizerCondition;
  readonly cache: RecognizerCache;
  private readonly neuralNetwork: NeuralNetwork;

  constructor(condition: RecognizerCondition, neuralNetwork: NeuralNetwork, cache: RecognizerCache) {
    this.condition = condition;
    this.neuralNetwork = neuralNetwork;
    this.cache = cache;
  }

  /**
   * Applies the part of speech recognizer rule to a given word.
   * Returns a part of speech of a given word.
   * Returns null if a part of speech was not recognized.
   */
  apply(word: string): PartOfSpeech {
    if (this.cache[word] != null) {
      return this.cache[word];
    }
    return this.neuralNetwork.activate(word);
  }
}
