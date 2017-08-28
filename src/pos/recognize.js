"use strict";

const NeuralNetwork = require("./neural-network");

/**
 * The neural network for recognizing the part of speech of the words ending with -а, -я.
 *
 * @type {NeuralNetwork}
 */
const pos_nn_a_ja = new NeuralNetwork(__pos_nn_structure__a_ja__);

const cache = __pos_nn_cache__;

/**
 * Recognize the part of speech of the word.
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
        return cache[value] = pos_nn_a_ja.run(value);
    }

    return null;
};
