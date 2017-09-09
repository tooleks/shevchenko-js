"use strict";

const NeuralNetwork = require("./neural-network");

/**
 * The neural network for recognizing the part of speech of the words ending with -а, -я (female gender).
 *
 * @type {NeuralNetwork}
 */
const posNnAYa = new NeuralNetwork(__pos_nn_a_ya_structure___);
const posNnAYaCache = __pos_nn_a_ya_cache__;

/**
 * The neural network for recognizing the part of speech of the words ending with -ий, -ій (male gender).
 *
 * @type {NeuralNetwork}
 */
const posNnYiIi = new NeuralNetwork(__pos_nn_yi_ii_structure___);
const posNnYiIiCache = __pos_nn_yi_ii_cache__;

/**
 * Recognize the part of speech of the word.
 *
 * @param {string} gender
 * @param {string} value
 * @return {string|null}
 */
module.exports = (gender, value) => {
    let pos = null;

    if (gender === "female") pos = recognizeFemaleGenderPos(value);
    else if (gender === "male") pos = recognizeMaleGenderPos(value);

    return pos;
};

/**
 * @param {string} value
 * @return {string|null}
 */
function recognizeFemaleGenderPos(value) {
    // Fetch the value's part of speech using the cache.
    if (posNnAYaCache.hasOwnProperty(value)) {
        return posNnAYaCache[value];
    }

    // Fetch the value's part of speech using the neural network.
    if (/(а|я)$/.test(value)) {
        return posNnAYaCache[value] = posNnAYa.run(value);
    }

    return null;
}

/**
 * @param {string} value
 * @return {string|null}
 */
function recognizeMaleGenderPos(value) {
    // Fetch the value's part of speech using the cache.
    if (posNnYiIiCache.hasOwnProperty(value)) {
        return posNnYiIiCache[value];
    }

    // Fetch the value's part of speech using the neural network.
    if (/(ий|ій)$/.test(value)) {
        return posNnYiIiCache[value] = posNnYiIi.run(value);
    }

    return null;
}
