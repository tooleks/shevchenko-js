"use strict";

const {
    NETWORK_LAYER_SIZE_INPUT,
    NETWORK_LAYER_SIZE_HIDDEN,
    NETWORK_LAYER_SIZE_OUTPUT,
    POS_MAPPING,
} = require("./config");
const {isValidPos, encodeInput, encodeOutput, decodeOutput} = require("./utils");
const NeuralNetwork = require("./NeuralNetwork");

module.exports = {
    NETWORK_LAYER_SIZE_INPUT,
    NETWORK_LAYER_SIZE_HIDDEN,
    NETWORK_LAYER_SIZE_OUTPUT,
    POS_MAPPING,
    isValidPos,
    encodeInput,
    encodeOutput,
    decodeOutput,
    NeuralNetwork,
};
