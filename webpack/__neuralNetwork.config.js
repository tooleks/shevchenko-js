"use strict";

const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./common.config");

module.exports = merge(commonConfig, {
    entry: {
        index: path.resolve(__dirname, "../src/pos/neuralNetwork/index.js"),
    },
    optimization: {
        minimize: false,
    },
    output: {
        path: path.resolve(__dirname, "../dist/__neuralNetwork/"),
        filename: "index.js",
    },
});
