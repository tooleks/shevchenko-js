"use strict";

const path = require("path");
const webpack = require("webpack");
const macro = require("../macro");

module.exports = {
    mode: process.env.NODE_ENV || "production",
    output: {
        path: path.resolve(__dirname, "../dist/"),
        filename: "[name].js",
        libraryTarget: "umd",
        // Note: The following line is needed to be able to build "umd" module compatible with Node.js.
        globalObject: `typeof self !== "undefined" ? self : this`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [new webpack.EnvironmentPlugin({...macro}), new webpack.BannerPlugin("Copyright (c) Oleksandr Tolochko.")],
};
