"use strict";

/**
 * Number of nodes for input layer.
 *
 * @type {number}
 */
const NETWORK_LAYER_SIZE_INPUT = 360;

/**
 * Number of nodes for hidden layer.
 *
 * @type {number}
 */
const NETWORK_LAYER_SIZE_HIDDEN = 20;

/**
 * Number of nodes for output layer.
 *
 * @type {number}
 */
const NETWORK_LAYER_SIZE_OUTPUT = 1;

/**
 * Preconfigured mapping for parts of speech.
 *
 * @type {Readonly}
 */
const POS_MAPPING = Object.freeze({
    noun: [0],
    adjective: [1],
});

module.exports = {
    NETWORK_LAYER_SIZE_INPUT,
    NETWORK_LAYER_SIZE_HIDDEN,
    NETWORK_LAYER_SIZE_OUTPUT,
    POS_MAPPING,
};
