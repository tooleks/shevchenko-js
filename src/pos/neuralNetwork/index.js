"use strict";

const config = require("./config");
const NeuralNetwork = require("./NeuralNetwork");
const utils = require("./utils");

module.exports = {...config, NeuralNetwork, ...utils};
