"use strict";

const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./common.config");
const pkg = require("../package");

module.exports = merge(commonConfig, {
    entry: {
        index: path.resolve(__dirname, "../src/index.js"),
    },
    optimization: {
        minimize: true,
    },
    output: {
        path: path.resolve(__dirname, "../dist/bundle/"),
        filename: `${pkg.name}.min.js`,
        library: pkg.name,
        libraryTarget: "umd",
        // Note: The following line is needed to be able to build "umd" module compatible with Node.js.
        globalObject: `typeof self !== "undefined" ? self : this`,
    },
});
