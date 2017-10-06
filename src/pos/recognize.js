"use strict";

const NeuralNetwork = require("./neural-network");

/**
 * The neural network for recognizing the part of speech of the words ending with -а, -я (female gender).
 *
 * @type {NeuralNetwork}
 */
const posNnAYa = new NeuralNetwork(__pos_nn_a_ya_structure__);
const posNnAYaCache = __pos_nn_a_ya_cache__;

/**
 * The neural network for recognizing the part of speech of the words ending with -ой, -ий, -ій (male gender).
 *
 * @type {NeuralNetwork}
 */
const posNnOiYiIi = new NeuralNetwork(__pos_nn_oi_yi_ii_structure__);
const posNnOiYiIiCache = __pos_nn_oi_yi_ii_cache__;

/**
 * The neural network for recognizing the part of speech of the words ending with -их (male gender).
 *
 * @type {NeuralNetwork}
 */
const posNnYh = new NeuralNetwork(__pos_nn_yh_structure__);
const posNnYhCache = __pos_nn_yh_cache__;

/**
 * Recognize the part of speech of the word.
 *
 * @param {string} gender
 * @param {string} value
 * @return {string|null}
 */
module.exports = (gender, value) => {
    if (gender === "female") {
        return recognizeFemaleGenderPos(value);
    } else if (gender === "male") {
        return recognizeMaleGenderPos(value);
    }

    return null;
};

/**
 * @param {string} value
 * @return {string|null}
 */
function recognizeFemaleGenderPos(value) {
    if (/(а|я)$/.test(value)) {
        return posNnAYaCache.hasOwnProperty(value)
            ? posNnAYaCache[value]
            : posNnAYaCache[value] = posNnAYa.run(value);
    }

    return null;
}

/**
 * @param {string} value
 * @return {string|null}
 */
function recognizeMaleGenderPos(value) {
    if (/(ой|ий|ій)$/.test(value)) {
        return posNnOiYiIiCache.hasOwnProperty(value)
            ? posNnOiYiIiCache[value]
            : posNnOiYiIiCache[value] = posNnOiYiIi.run(value);
    }

    if (/(их)$/.test(value)) {
        return posNnYhCache.hasOwnProperty(value)
            ? posNnYhCache[value]
            : posNnYhCache[value] = posNnYh.run(value);
    }

    return null;
}
