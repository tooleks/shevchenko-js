"use strict";

const synaptic = require("synaptic");

const NETWORK_LAYER_SIZE_INPUT = 360;
const NETWORK_LAYER_SIZE_HIDDEN = 100;
const NETWORK_LAYER_SIZE_OUTPUT = 2;

const POS = {
    adjective: [0, 1],
    noun: [1, 0],
};

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

    /**
     * Run the neural network on the input data.
     *
     * @param {string} value
     * @return {string|null}
     */
    this.run = (value) => {
        const normalizedInput = NeuralNetwork.normalizeInput(value);
        const normalizedOutput = this.network.activate(normalizedInput);
        const denormalizedOutput = NeuralNetwork.denormalizeOutput(normalizedOutput);
        return typeof denormalizedOutput !== "undefined" ? denormalizedOutput : null;
    };

    return this;
}

/**
 * Build the neural network on the training data array.
 *
 * @param {Array<Object>} samples
 * @param {Object} options
 * @return {Object}
 */
NeuralNetwork.build = (samples, options) => {
    const network = new synaptic.Architect.Perceptron(NETWORK_LAYER_SIZE_INPUT, NETWORK_LAYER_SIZE_HIDDEN, NETWORK_LAYER_SIZE_OUTPUT);
    const trainer = new synaptic.Trainer(network);
    trainer.train(samples, options);
    return network.toJSON();
};

/**
 * Get an array of part of speech names.
 *
 * @return {Array<string>}
 */
NeuralNetwork.getPosNames = () => Object.keys(POS);

/**
 * Normalize the input for the neural network. Human-readable -> Machine-readable.
 *
 * @param {string} value
 * @return {Array<number>}
 */
NeuralNetwork.normalizeInput = (value) => {
    /**
     * @param {string} string
     * @return {string}
     */
    const stringToBinary = (string) => {
        return string.split("").map((char) => char.charCodeAt(0).toString(2)).join("");
    };

    /**
     * @param {string} string
     * @param {number} length
     * @param {string} symbol
     * @return {string}
     */
    const stringFillLeft = (string, length = NETWORK_LAYER_SIZE_INPUT, symbol = "0") => {
        const filler = (new Array(length + 1)).join(symbol);
        return filler.substring(0, filler.length - string.length) + string;
    };

    return stringFillLeft(stringToBinary(value)).split("")
};

/**
 * Normalize the output for the neural network. Human-readable -> Machine-readable.
 *
 * @param {string} value
 * @return {Array<number>|null}
 */
NeuralNetwork.normalizeOutput = (value) => POS[value];

/**
 * Denormalize the output of the neural network. Machine-readable -> Human-readable.
 *
 * @param {Array<number>} value
 * @return {string|null}
 */
NeuralNetwork.denormalizeOutput = (value) => {
    const maxValueIndex = value.reduce((accumulator, value, index, array) => (value > array[accumulator]) ? index : accumulator, 0);
    const normalizedValue = value.map((value, index) => Number(index === maxValueIndex));
    const posIndex = Object.values(POS).map((value) => value.join("")).indexOf(normalizedValue.join(""));
    return Object.keys(POS)[posIndex];
};

module.exports = NeuralNetwork;
