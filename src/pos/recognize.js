"use strict";

const {NeuralNetwork} = require("./NeuralNetwork");

/**
 * The neural network for recognizing the part of speech of the words ending with "-а", "-я" (female gender).
 *
 * @type {NeuralNetwork}
 */
const POS_NN_A_YA = new NeuralNetwork(process.env.POS_NN_A_YA_STRUCTURE);
const POS_NN_A_YA_CACHE = process.env.POS_NN_A_YA_CACHE;

/**
 * The neural network for recognizing the part of speech of the words ending with "-ой", "-ий", "-ій" (male gender).
 *
 * @type {NeuralNetwork}
 */
const POS_NN_OI_YI_II = new NeuralNetwork(process.env.POS_NN_OI_YI_II_STRUCTURE);
const POS_NN_OI_YI_II_CACHE = process.env.POS_NN_OI_YI_II_CACHE;

/**
 * The neural network for recognizing the part of speech of the words ending with "-их" (male gender).
 *
 * @type {NeuralNetwork}
 */
const POS_NN_YH = new NeuralNetwork(process.env.POS_NN_YH_STRUCTURE);
const POS_NN_YH_CACHE = process.env.POS_NN_YH_CACHE;

/**
 * @param {string} value
 * @return {string|null}
 */
function recognizeFemaleGenderPos(value) {
    // If value ends with "-а", "-я" look for a value in the cache.
    // If value not found in the cache, pass the value to neural network and store result in the cache.
    if (/(а|я)$/.test(value)) {
        if (!POS_NN_A_YA_CACHE.hasOwnProperty(value)) {
            POS_NN_A_YA_CACHE[value] = POS_NN_A_YA.run(value);
        }
        return POS_NN_A_YA_CACHE[value];
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
        if (!POS_NN_OI_YI_II_CACHE.hasOwnProperty(value)) {
            POS_NN_OI_YI_II_CACHE[value] = POS_NN_OI_YI_II.run(value);
        }
        return POS_NN_OI_YI_II_CACHE[value];
    }

    // If value ends with "-их" look for a value in the cache.
    // If value not found in the cache, pass the value to neural network and store result in the cache.
    if (/(их)$/.test(value)) {
        if (!POS_NN_YH_CACHE.hasOwnProperty(value)) {
            POS_NN_YH_CACHE[value] = POS_NN_YH.run(value);
        }
        return POS_NN_YH_CACHE[value];
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
function recognizePos(gender, value) {
    if (gender === "female") {
        return recognizeFemaleGenderPos(value.toLowerCase());
    } else if (gender === "male") {
        return recognizeMaleGenderPos(value.toLowerCase());
    }

    return null;
}

module.exports = recognizePos;
