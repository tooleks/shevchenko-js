"use strict";

const moment = require("moment");
const webpack = require("webpack");
const macro = require("../macro");
const pkg = require("../package");

module.exports = {
    mode: process.env.NODE_ENV || "production",
    output: {
        libraryTarget: "commonjs2",
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
    optimization: {
        minimize: false,
    },
    plugins: [
        new webpack.EnvironmentPlugin({...macro}),
        new webpack.BannerPlugin(
            `/* ${pkg.name} v${pkg.version} ${moment.utc().toISOString()}.` +
                ` Copyright (c) ${pkg.author}. License: ${pkg.license}. */`,
        ),
    ],
};
