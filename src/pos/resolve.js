"use strict";

const NeuralNetwork = require("./neural-network");

const posNeuralNetwork = new NeuralNetwork(__pos_neural_network_structure__);

const cache = __pos_neural_network_cache__;

/**
 * Resolve the part of speech of the word.
 *
 * @param {string} value
 * @param {boolean} cacheable
 * @return {string|null}
 */
module.exports = (value, cacheable = true) => {
    // Fetch the value's part of speech using the cache.
    if (cacheable && cache.hasOwnProperty(value)) {
        return cache[value];
    }

    // Fetch the value's part of speech using the neural network.
    // #pos_limits - The part of speech resolver works only with the female genus words ending with -а, -я.
    if (/[ая]$/.test(value)) {
        return cache[value] = posNeuralNetwork.run(value);
    }

    return null;
};
