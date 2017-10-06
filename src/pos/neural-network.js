"use strict";

const synaptic = require("synaptic");
const utils = require("../utils");

const NETWORK_LAYER_SIZE_INPUT = 360;
const NETWORK_LAYER_SIZE_HIDDEN = 20;
const NETWORK_LAYER_SIZE_OUTPUT = 1;

const POS = {noun: [0], adjective: [1]};

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
     * Get the neural network structure.
     *
     * @return {object}
     */
    this.structure = () => this.network.toJSON();

    /**
     * @return {string}
     */
    this.toString = () => JSON.stringify(this.structure());

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
        return denormalizedOutput || null;
    };

    /**
     * Train the neural network on the training data array.
     *
     * @param {Array<Object>} samples
     * @param {object} options
     * @return {NeuralNetwork}
     */
    this.train = (samples, options) => {
        new synaptic.Trainer(this.network).train(samples, options);
        return this;
    };
}

/**
 * Build the neural network on the training data array.
 *
 * @param {Array<Object>} samples
 * @param {object} options
 * @return {object}
 */
NeuralNetwork.build = (samples, options) => {
    const network = new synaptic.Architect.Perceptron(NETWORK_LAYER_SIZE_INPUT, NETWORK_LAYER_SIZE_HIDDEN, NETWORK_LAYER_SIZE_OUTPUT);
    new synaptic.Trainer(network).train(samples, options);
    return new NeuralNetwork(network.toJSON());
};

/**
 * Get an array of part of speech names.
 *
 * @return {Array<string>}
 */
NeuralNetwork.getPosNames = () => Object.keys(POS);

/**
 * Determine if a value is a valid part of speech name.
 *
 * @param value
 */
NeuralNetwork.isValidPosName = (value) => {
    return NeuralNetwork.getPosNames().indexOf(value) !== -1;
};

/**
 * Normalize the input for the neural network. Human-readable -> Machine-readable.
 *
 * @param {string} value
 * @return {Array<number>}
 */
NeuralNetwork.normalizeInput = (value) => {
    const binaryValue = utils.string.toBinary(value);
    return utils.string.padLeft(binaryValue, NETWORK_LAYER_SIZE_INPUT).split("");
};

/**
 * Normalize the output for the neural network. Human-readable -> Machine-readable.
 *
 * @param {string} value
 * @return {Array<number>|undefined}
 */
NeuralNetwork.normalizeOutput = (value) => POS[value];

/**
 * Denormalize the output of the neural network. Machine-readable -> Human-readable.
 *
 * @param {Array<number>} value
 * @return {string|undefined}
 */
NeuralNetwork.denormalizeOutput = (value) => {
    const normalizedValue = value.map((value) => Number(value >= 0.5));
    const posIndex = Object.values(POS)
        .reduce((posIndex, value, index) => value.join("") === normalizedValue.join("") ? index : posIndex);
    return Object.keys(POS)[posIndex];
};

module.exports = NeuralNetwork;
