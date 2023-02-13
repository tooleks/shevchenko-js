import { Gender } from '../core';
import { NeuralNetwork } from './neural-network';
import { NeuralNetworkTrainingData } from './neural-network-training-data';
import { PartOfSpeech } from './part-of-speech.enum';
import { WordTransformer } from './word-transformer';

export interface PartOfSpeechRecognitionGuard {
  (word: string, gender: Gender): boolean;
}

export class PartOfSpeechRecognitionRule {
  readonly guard: PartOfSpeechRecognitionGuard;
  readonly cache: NeuralNetworkTrainingData;
  private readonly neuralNetwork: NeuralNetwork;

  constructor(
    guard: PartOfSpeechRecognitionGuard,
    neuralNetwork: NeuralNetwork,
    cache: NeuralNetworkTrainingData,
  ) {
    this.guard = guard;
    this.neuralNetwork = neuralNetwork;
    this.cache = cache;
  }

  /**
   * Applies the part of speech recognizer rule to the given word.
   * Returns a part of speech of the given word.
   */
  apply(word: string): PartOfSpeech {
    const transformedWord = new WordTransformer().transform(word);
    if (this.cache[transformedWord]) {
      return this.cache[transformedWord];
    }
    return this.neuralNetwork.activate(transformedWord);
  }
}
