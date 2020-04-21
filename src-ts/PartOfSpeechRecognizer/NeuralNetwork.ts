import * as synaptic from 'synaptic';
import PartOfSpeech from '../Core/PartOfSpeech';
import WordEncoder from './WordEncoder';
import PartOfSpeechDecoder from './PartOfSpeechDecoder';
import NeuralNetworkParameters from './NeuralNetworkParameters';
import PartOfSpeechEncoder from './PartOfSpeechEncoder';
import NeuralNetworkTrainingData from './NeuralNetworkTrainingData';

export default class NeuralNetwork {
  private network: synaptic.Network;

  constructor() {
    this.network = new synaptic.Architect.Perceptron(
      NeuralNetworkParameters.InputLayerSize,
      NeuralNetworkParameters.HiddenLayerSize,
      NeuralNetworkParameters.OutputLayerSize,
    );
  }

  /**
   * Creates a neural network from JSON.
   */
  static fromJSON(structure: any): NeuralNetwork {
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
  toString(): string {
    return JSON.stringify(this.toJSON());
  }

  /**
   * Trains the neural network using a given training data.
   */
  train(data: NeuralNetworkTrainingData, options: any): NeuralNetwork {
    const samples = Object.entries(data).map(([word, partOfSpeech]) => {
      const input = new WordEncoder().encode(word);
      const output = new PartOfSpeechEncoder().encode(partOfSpeech);
      return { input, output };
    });
    new synaptic.Trainer(this.network).train(samples, options);
    return this;
  }

  /**
   * Activates the neural network for a given word.
   * Returns a part of speech of a given word.
   */
  activate(word: string): PartOfSpeech {
    const input = new WordEncoder().encode(word);
    const output = this.network.activate(input);
    return new PartOfSpeechDecoder().decode(output);
  }
}
