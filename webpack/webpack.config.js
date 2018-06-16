"use strict";

const bundleConfig = require("./bundle.config");
const moduleConfig = require("./module.config");
const __neuralNetwork = require("./__neuralNetwork.config");

module.exports = [bundleConfig, moduleConfig, __neuralNetwork];
