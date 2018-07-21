"use strict";

const {toBinary, padLeft} = require("../../utils/string");
const {POS_MAPPING, NETWORK_LAYER_SIZE_INPUT} = require("./config");

/**
 * Determine if provided value is a valid part of speech.
 *
 * @param value
 */
function isValidPos(value) {
    return Object.keys(POS_MAPPING).indexOf(value) !== -1;
}

/**
 * Encode word value for usage in the neural network.
 *
 * @param {string} input
 * @return {Array<number>}
 */
function encodeInput(input) {
    return padLeft(toBinary(input), NETWORK_LAYER_SIZE_INPUT).split("");
}

/**
 * Encode part of speech value for usage in the neural network.
 *
 * @param {string} output
 * @return {Array<number>|undefined}
 */
function encodeOutput(output) {
    return POS_MAPPING[output];
}

/**
 * Decode part of speech value returned from the neural network.
 *
 * @param {Array<number>} output
 * @return {string|null}
 */
function decodeOutput(output) {
    // Neural network output is an array of values in 0..1 range.
    // We'll need to convert these values to integer values.
    // If value greater than or equal to 0.5 - convert to 1.
    // If value less than 0.5 - convert to 0.
    const value = output.map((value) => Number(value >= 0.5));
    const posIndex = Object.values(POS_MAPPING).findIndex((posValue) => posValue.join("") === value.join(""));
    return Object.keys(POS_MAPPING)[posIndex] || null;
}

module.exports = {isValidPos, encodeInput, encodeOutput, decodeOutput};
