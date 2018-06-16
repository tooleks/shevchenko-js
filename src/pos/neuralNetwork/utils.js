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
    const value = output.map((value) => Math.ceil(value));
    const posIndex = Object.values(POS_MAPPING).findIndex((posValue) => posValue.join("") === value.join(""));
    return Object.keys(POS_MAPPING)[posIndex] || null;
}

module.exports = {isValidPos, encodeInput, encodeOutput, decodeOutput};
