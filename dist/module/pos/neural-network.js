"use strict";

var synaptic = require("synaptic");
var utils = require("../utils");

var NETWORK_LAYER_SIZE_INPUT = 360;
var NETWORK_LAYER_SIZE_HIDDEN = 20;
var NETWORK_LAYER_SIZE_OUTPUT = 1;

var POS = { noun: [0], adjective: [1] };

/**
 * NeuralNetwork used for the part of speech recognizing.
 */
function NeuralNetwork(structure) {
  /**
   * Neural network instance.
   *
   * @property {synaptic.Network}
   */
  this.network = synaptic.Network.fromJSON(structure);

  return this;
}

/**
 * Get the neural network structure.
 *
 * @return {object}
 */
NeuralNetwork.prototype.structure = function () {
  return this.network.toJSON();
};

/**
 * @return {string}
 */
NeuralNetwork.prototype.toString = function () {
  return JSON.stringify(this.structure());
};

/**
 * Run the neural network on the input data.
 *
 * @param {string} value
 * @return {string|null}
 */
NeuralNetwork.prototype.run = function (value) {
  var normalizedInput = NeuralNetwork.normalizeInput(value);
  var normalizedOutput = this.network.activate(normalizedInput);
  var denormalizedOutput = NeuralNetwork.denormalizeOutput(normalizedOutput);
  return denormalizedOutput || null;
};

/**
 * Train the neural network on the training data array.
 *
 * @param {Array<object>} samples
 * @param {object} options
 * @return {NeuralNetwork}
 */
NeuralNetwork.prototype.train = function (samples, options) {
  new synaptic.Trainer(this.network).train(samples, options);
  return this;
};

/**
 * Build the neural network on the training data array.
 *
 * @param {Array<object>} samples
 * @param {object} options
 * @return {object}
 */
NeuralNetwork.build = function (samples, options) {
  var network = new synaptic.Architect.Perceptron(NETWORK_LAYER_SIZE_INPUT, NETWORK_LAYER_SIZE_HIDDEN, NETWORK_LAYER_SIZE_OUTPUT);
  new synaptic.Trainer(network).train(samples, options);
  return new NeuralNetwork(network.toJSON());
};

/**
 * Get an array of part of speech names.
 *
 * @return {Array<string>}
 */
NeuralNetwork.getPosNames = function () {
  return Object.keys(POS);
};

/**
 * Determine if a value is a valid part of speech name.
 *
 * @param value
 */
NeuralNetwork.isValidPosName = function (value) {
  return NeuralNetwork.getPosNames().indexOf(value) !== -1;
};

/**
 * Normalize the input for the neural network. Human-readable -> Machine-readable.
 *
 * @param {string} value
 * @return {Array<number>}
 */
NeuralNetwork.normalizeInput = function (value) {
  var binaryValue = utils.string.toBinary(value);
  return utils.string.padLeft(binaryValue, NETWORK_LAYER_SIZE_INPUT).split("");
};

/**
 * Normalize the output for the neural network. Human-readable -> Machine-readable.
 *
 * @param {string} value
 * @return {Array<number>|undefined}
 */
NeuralNetwork.normalizeOutput = function (value) {
  return POS[value];
};

/**
 * Denormalize the output of the neural network. Machine-readable -> Human-readable.
 *
 * @param {Array<number>} value
 * @return {string|undefined}
 */
NeuralNetwork.denormalizeOutput = function (value) {
  var normalizedValue = value.map(function (value) {
    return Number(value >= 0.5);
  });
  var posIndex = Object.values(POS).reduce(function (posIndex, value, index) {
    return value.join("") === normalizedValue.join("") ? index : posIndex;
  });
  return Object.keys(POS)[posIndex];
};

module.exports = NeuralNetwork;