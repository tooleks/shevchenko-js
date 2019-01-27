import * as synaptic from 'synaptic';
import {NETWORK_LAYER_SIZE_INPUT, NETWORK_LAYER_SIZE_HIDDEN, NETWORK_LAYER_SIZE_OUTPUT} from './config';
import * as neuralNetworkUtil from './neuralNetworkUtil';

/**
 * @classdesc Part of speech recognition neural network based on three-layer perceptron.
 */
export default class NeuralNetwork {
  /**
   * Build the neural network on the training data.
   *
   * @param {Array<object>} samples
   * @param {object} options
   * @return {NeuralNetwork}
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
    this._network = synaptic.Network.fromJSON(structure);
    this.train = this.train.bind(this);
    this.run = this.run.bind(this);
    this.toString = this.toString.bind(this);
  }

  /**
   * Train the neural network on the training data samples.
   *
   * @param {Array<object>} samples
   * @param {object} options
   * @return {void}
   */
  train(samples, options) {
    new synaptic.Trainer(this._network).train(samples, options);
  }

  /**
   * Run the neural network on the input data.
   *
   * @param {string} input
   * @return {string|null}
   */
  run(input) {
    const value = neuralNetworkUtil.encodeInput(input);
    const output = this._network.activate(value);
    return neuralNetworkUtil.decodeOutput(output);
  }

  /**
   * @return {string}
   */
  toString() {
    return JSON.stringify(this._network.toJSON());
  }
}
