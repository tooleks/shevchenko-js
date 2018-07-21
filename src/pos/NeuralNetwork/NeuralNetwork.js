"use strict";

const synaptic = require("synaptic");
const {NETWORK_LAYER_SIZE_INPUT, NETWORK_LAYER_SIZE_HIDDEN, NETWORK_LAYER_SIZE_OUTPUT} = require("./config");
const {encodeInput, decodeOutput} = require("./utils");

/**
 * NeuralNetwork class.
 *
 * Based on three-layer perceptron and used for the part of speech recognizing.
 */
class NeuralNetwork {
    /**
     * NeuralNetwork constructor.
     *
     * @param {Object} structure
     */
    constructor(structure) {
        this.network = synaptic.Network.fromJSON(structure);
        this.train = this.train.bind(this);
        this.build = this.build.bind(this);
        this.run = this.run.bind(this);
        this.structure = this.structure.bind(this);
        this.toString = this.toString.bind(this);
    }

    /**
     * Train the neural network on the training data samples.
     *
     * @param {Array<Object>} samples
     * @param {Object} options
     * @return {NeuralNetwork}
     */
    train(samples, options) {
        new synaptic.Trainer(this.network).train(samples, options);
        return this;
    }

    /**
     * Build the neural network on the training data array.
     *
     * @param {Array<Object>} samples
     * @param {Object} options
     * @return {NeuralNetwork}
     */
    build(samples, options) {
        const network = new synaptic.Architect.Perceptron(
            NETWORK_LAYER_SIZE_INPUT,
            NETWORK_LAYER_SIZE_HIDDEN,
            NETWORK_LAYER_SIZE_OUTPUT,
        );
        new synaptic.Trainer(network).train(samples, options);
        return new NeuralNetwork(network.toJSON());
    }

    /**
     * Run the neural network on the input data.
     *
     * @param {string} input
     * @return {string|null}
     */
    run(input) {
        const value = encodeInput(input);
        const output = this.network.activate(value);
        return decodeOutput(output);
    }

    /**
     * Get the neural network structure.
     *
     * @return {Object}
     */
    structure() {
        return this.network.toJSON();
    }

    /**
     * Cast to string.
     *
     * @return {string}
     */
    toString() {
        return JSON.stringify(this.structure());
    }
}

module.exports = NeuralNetwork;
