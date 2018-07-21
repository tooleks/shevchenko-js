"use strict";

const moment = require("moment");
const webpack = require("webpack");
const ReplacePlugin = require("webpack-plugin-replace");
const MACRO = require("../macro");
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
        new ReplacePlugin({
            exclude: /node_modules/,
            values: {
                "process.env.INFLECTION_RULES": JSON.stringify(MACRO.INFLECTION_RULES),
                "process.env.POS_NN_A_YA_STRUCTURE": JSON.stringify(MACRO.POS_NN_A_YA_STRUCTURE),
                "process.env.POS_NN_A_YA_CACHE": JSON.stringify(MACRO.POS_NN_A_YA_CACHE),
                "process.env.POS_NN_OI_YI_II_STRUCTURE": JSON.stringify(MACRO.POS_NN_OI_YI_II_STRUCTURE),
                "process.env.POS_NN_OI_YI_II_CACHE": JSON.stringify(MACRO.POS_NN_OI_YI_II_CACHE),
                "process.env.POS_NN_YH_STRUCTURE": JSON.stringify(MACRO.POS_NN_YH_STRUCTURE),
                "process.env.POS_NN_YH_CACHE": JSON.stringify(MACRO.POS_NN_YH_CACHE),
            },
        }),
        new webpack.BannerPlugin(
            `/* ${pkg.name} v${pkg.version} ${moment.utc().toISOString()}.` +
                ` Copyright (c) ${pkg.author}. License: ${pkg.license}. */`,
        ),
    ],
};
