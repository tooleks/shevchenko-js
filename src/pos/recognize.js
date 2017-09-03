"use strict";

const NeuralNetwork = require("./neural-network");

/**
 * The neural network for recognizing the part of speech of the words ending with -а, -я.
 *
 * @type {NeuralNetwork}
 */
const posNnAYa = new NeuralNetwork(__pos_nn_a_ya_structure___);
const posNnAYaCache = __pos_nn_a_ya_cache__;

/**
 * Recognize the part of speech of the word.
 *
 * @param {string} value
 * @return {string|null}
 */
module.exports = (value) => {
    // Fetch the value's part of speech using the cache.
    if (posNnAYaCache.hasOwnProperty(value)) {
        return posNnAYaCache[value];
    }

    // Fetch the value's part of speech using the neural network.
    if (/[ая]$/.test(value)) {
        return posNnAYaCache[value] = posNnAYa.run(value);
    }

    return null;
};
