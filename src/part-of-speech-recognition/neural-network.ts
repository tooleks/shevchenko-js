import synaptic from 'synaptic';
import { PartOfSpeech } from './part-of-speech.enum';
import { WordEncoder } from './word-encoder';
import { PartOfSpeechDecoder } from './part-of-speech-decoder';
import { neuralNetworkConfig } from './neural-network-config';
import { PartOfSpeechEncoder } from './part-of-speech-encoder';
import { NeuralNetworkTrainingData } from './neural-network-training-data';

export class NeuralNetwork {
  private network: synaptic.Network;

  constructor() {
    this.network = new synaptic.Architect.Perceptron(
      neuralNetworkConfig.inputLayerSize,
      neuralNetworkConfig.hiddenLayerSize,
      neuralNetworkConfig.outputLayerSize,
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
    return JSON.stringify(this.toJSON(), null, 2);
  }

  /**
   * Trains the neural network using a given training data.
   */
  train(trainingData: NeuralNetworkTrainingData, trainingOptions: any): NeuralNetwork {
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
  activate(word: string): PartOfSpeech {
    const input = new WordEncoder().encode(word);
    const output = this.network.activate(input);
    return new PartOfSpeechDecoder().decode(output);
  }
}
