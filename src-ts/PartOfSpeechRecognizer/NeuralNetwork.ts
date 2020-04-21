import * as synaptic from 'synaptic';
import PartOfSpeech from '../Core/PartOfSpeech';
import WordEncoder from './WordEncoder';
import PartOfSpeechDecoder from './PartOfSpeechDecoder';
import NeuralNetworkParameters from './NeuralNetworkParameters';

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
   * Serializes the neural network to JSON.
   */
  toJSON() {
    return this.network.toJSON();
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
