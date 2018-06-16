"use strict";

const {NeuralNetwork} = require("./neuralNetwork");

/**
 * The neural network for recognizing the part of speech of the words ending with "-а", "-я" (female gender).
 *
 * @type {NeuralNetwork}
 */
const posNnAYa = new NeuralNetwork(JSON.parse(process.env.POS_NN_A_YA_STRUCTURE));
const posNnAYaCache = JSON.parse(process.env.POS_NN_A_YA_CACHE);

/**
 * The neural network for recognizing the part of speech of the words ending with "-ой", "-ий", "-ій" (male gender).
 *
 * @type {NeuralNetwork}
 */
const posNnOiYiIi = new NeuralNetwork(JSON.parse(process.env.POS_NN_OI_YI_II_STRUCTURE));
const posNnOiYiIiCache = JSON.parse(process.env.POS_NN_OI_YI_II_CACHE);

/**
 * The neural network for recognizing the part of speech of the words ending with "-их" (male gender).
 *
 * @type {NeuralNetwork}
 */
const posNnYh = new NeuralNetwork(JSON.parse(process.env.POS_NN_YH_STRUCTURE));
const posNnYhCache = JSON.parse(process.env.POS_NN_YH_CACHE);

/**
 * @param {string} value
 * @return {string|null}
 */
function recognizeFemaleGenderPos(value) {
    // If value ends with "-а", "-я" look for a value in the cache.
    // If value not found in the cache, pass the value to neural network and store result in the cache.
    if (/(а|я)$/.test(value)) {
        if (!posNnAYaCache.hasOwnProperty(value)) {
            posNnAYaCache[value] = posNnAYa.run(value);
        }
        return posNnAYaCache[value];
    }

    return null;
}

/**
 * @param {string} value
 * @return {string|null}
 */
function recognizeMaleGenderPos(value) {
    // If value ends with "-ой", "-ий", "-ій" look for a value in the cache.
    // If value not found in the cache, pass the value to neural network and store result in the cache.
    if (/(ой|ий|ій)$/.test(value)) {
        if (!posNnOiYiIiCache.hasOwnProperty(value)) {
            posNnOiYiIiCache[value] = posNnOiYiIi.run(value);
        }
        return posNnOiYiIiCache[value];
    }

    // If value ends with "-их" look for a value in the cache.
    // If value not found in the cache, pass the value to neural network and store result in the cache.
    if (/(их)$/.test(value)) {
        if (!posNnYhCache.hasOwnProperty(value)) {
            posNnYhCache[value] = posNnYh.run(value);
        }
        return posNnYhCache[value];
    }

    return null;
}

/**
 * Recognize the part of speech of the word.
 *
 * @param {string} gender
 * @param {string} value
 * @return {string|null}
 */
module.exports = (gender, value) => {
    if (gender === "female") {
        return recognizeFemaleGenderPos(value.toLowerCase());
    } else if (gender === "male") {
        return recognizeMaleGenderPos(value.toLowerCase());
    }

    return null;
};
