"use strict";

const NeuralNetwork = require("./neural-network");

const posNeuralNetwork = new NeuralNetwork(__pos_neural_network__);

const cache = {};

/**
 * Resolve the part of speech of the word.
 *
 * @param {string} value
 * @return {string|null}
 */
module.exports = (value) => {
    // Search value in the cache.
    if (typeof cache[value] !== "undefined") {
        return cache[value];
    }

    // Process value by the part of speech neural network.
    // #pos_limits - The part of speech resolver works only with the female genus words ending with -а, -я.
    if (/[ая]$/.test(value)) {
        return cache[value] = posNeuralNetwork.run(value);
    }

    return null;
};
