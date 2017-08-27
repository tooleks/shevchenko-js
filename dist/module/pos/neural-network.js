"use strict";

var synaptic = require("synaptic");
var helpers = require("../helpers");

var string = helpers.string;

var NETWORK_LAYER_SIZE_INPUT = 360;
var NETWORK_LAYER_SIZE_HIDDEN = 100;
var NETWORK_LAYER_SIZE_OUTPUT = 1;

var POS = {
  noun: [0],
  adjective: [1]
};

/**
 * NeuralNetwork used for the part of speech recognizing.
 */
function NeuralNetwork(structure) {
  var _this = this;

  /**
   * Neural network instance.
   *
   * @property {synaptic.Network}
   */
  this.network = synaptic.Network.fromJSON(structure);

  /**
   * Run the neural network on the input data.
   *
   * @param {string} value
   * @return {string|null}
   */
  this.run = function (value) {
    var normalizedInput = NeuralNetwork.normalizeInput(value);
    var normalizedOutput = _this.network.activate(normalizedInput);
    var denormalizedOutput = NeuralNetwork.denormalizeOutput(normalizedOutput);
    return denormalizedOutput || null;
  };
}

/**
 * Build the neural network on the training data array.
 *
 * @param {Array<Object>} samples
 * @param {Object} options
 * @return {Object}
 */
NeuralNetwork.build = function (samples, options) {
  var network = new synaptic.Architect.Perceptron(NETWORK_LAYER_SIZE_INPUT, NETWORK_LAYER_SIZE_HIDDEN, NETWORK_LAYER_SIZE_OUTPUT);
  var trainer = new synaptic.Trainer(network);
  trainer.train(samples, options);
  return network.toJSON();
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
  var binaryValue = string.toBinary(value);
  return string.padLeft(binaryValue, NETWORK_LAYER_SIZE_INPUT).split("");
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
    return value >= 0.5 ? 1 : 0;
  });
  var posIndex = Object.values(POS).reduce(function (accumulator, value, index) {
    return value.join("") === normalizedValue.join("") ? index : accumulator;
  });
  return Object.keys(POS)[posIndex];
};

module.exports = NeuralNetwork;