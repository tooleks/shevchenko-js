"use strict";

const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./common.config");
const pkg = require("../package");

module.exports = merge(commonConfig, {
    entry: {
        index: path.resolve(__dirname, "../src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "../dist/module/"),
        filename: `${pkg.name}.js`,
        library: pkg.name,
    },
});
