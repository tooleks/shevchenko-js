"use strict";

var synaptic = require("synaptic");

var pos = {
  noun: [1, 0],
  adjective: [0, 1]
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
    return typeof denormalizedOutput !== "undefined" ? denormalizedOutput : null;
  };

  return this;
}

/**
 * Build the neural network on the sample data array.
 *
 * @param {Array<Object>} samples
 * @param {Object} options
 * @return {Object}
 */
NeuralNetwork.build = function (samples, options) {
  var network = new synaptic.Architect.Perceptron(360, 100, NeuralNetwork.getPos().length);
  var trainer = new synaptic.Trainer(network);
  trainer.train(samples, options);
  return network.toJSON();
};

/**
 * Get an array of part of speech.
 *
 * @return {Array<string>}
 */
NeuralNetwork.getPos = function () {
  return Object.keys(pos);
};

/**
 * Normalize the input for the neural network. Human-readable -> Machine-readable.
 *
 * @param {string} value
 * @return {Array<number>}
 */
NeuralNetwork.normalizeInput = function (value) {
  /**
   * @param {string} string
   * @return {string}
   */
  var stringToBinary = function stringToBinary(string) {
    return string.split("").map(function (char) {
      return char.charCodeAt(0).toString(2);
    }).join("");
  };

  /**
   * @param {string} string
   * @param {number} length
   * @param {string} symbol
   * @return {string}
   */
  var stringFillLeft = function stringFillLeft(string) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 360;
    var symbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";

    var filler = new Array(length + 1).join(symbol);
    return filler.substring(0, filler.length - string.length) + string;
  };

  return stringFillLeft(stringToBinary(value)).split("");
};

/**
 * Normalize the output for the neural network. Human-readable -> Machine-readable.
 *
 * @param {string} value
 * @return {Array<number>|null}
 */
NeuralNetwork.normalizeOutput = function (value) {
  return pos[value];
};

/**
 * Denormalize the output of the neural network. Machine-readable -> Human-readable.
 *
 * @param {Array<number>} value
 * @return {string|null}
 */
NeuralNetwork.denormalizeOutput = function (value) {
  var maxValueIndex = value.reduce(function (accumulator, value, index, array) {
    return value > array[accumulator] ? index : accumulator;
  }, 0);
  var normalizedValue = value.map(function (value, index) {
    return Number(index === maxValueIndex);
  });
  var posIndex = Object.values(pos).map(function (value) {
    return value.join("");
  }).indexOf(normalizedValue.join(""));
  return Object.keys(pos)[posIndex];
};

module.exports = NeuralNetwork;