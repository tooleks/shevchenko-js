import * as synaptic from "synaptic";
import { NETWORK_LAYER_SIZE_INPUT, NETWORK_LAYER_SIZE_HIDDEN, NETWORK_LAYER_SIZE_OUTPUT } from "./config";
import * as neuralNetworkUtil from "./neuralNetworkUtil";

/**
 * @classdesc Part of speech recognition neural network based on three-layer perceptron.
 */
export default class NeuralNetwork {
  /**
   * Builds the neural network on the training data.
   *
   * @param {Array<object>} samples
   * @param {object} options
   * @returns {NeuralNetwork}
   */
  static build(samples, options) {
    const network = new synaptic.Architect.Perceptron(
      NETWORK_LAYER_SIZE_INPUT,
      NETWORK_LAYER_SIZE_HIDDEN,
      NETWORK_LAYER_SIZE_OUTPUT,
    );
    new synaptic.Trainer(network).train(samples, options);
    return new this(network.toJSON());
  }

  /**
   * @param {object} structure
   */
  constructor(structure) {
    this.network = synaptic.Network.fromJSON(structure);
  }

  /**
   * Trains the neural network on the training data samples.
   *
   * @param {Array<object>} samples
   * @param {object} options
   * @returns {NeuralNetwork}
   */
  train(samples, options) {
    new synaptic.Trainer(this.network).train(samples, options);
    return this;
  }

  /**
   * Runs the neural network on the input data.
   *
   * @param {string} input
   * @returns {string|null}
   */
  run(input) {
    const value = neuralNetworkUtil.encodeInput(input);
    const output = this.network.activate(value);
    return neuralNetworkUtil.decodeOutput(output);
  }

  /**
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this.network.toJSON());
  }
}
