"use strict";

const bundleConfig = require("./bundle.config");
const moduleConfig = require("./module.config");
const __NeuralNetwork__Config = require("./__NeuralNetwork__.config");

module.exports = [bundleConfig, moduleConfig, __NeuralNetwork__Config];
