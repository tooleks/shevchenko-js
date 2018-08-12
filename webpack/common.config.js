import moment from "moment";
import webpack from "webpack";
import ReplacePlugin from "webpack-plugin-replace";
import macro from "../macro";
import pkg from "../package.json";

/**
 * Get banner content.
 *
 * @param {object} pkg
 * @return {string}
 */
function getBanner(pkg) {
    const name = `${pkg.name} v${pkg.version}`;
    const timestamp = moment.utc().toISOString();
    const copyright = `Copyright (c) ${pkg.author}`;
    const license = `License: ${pkg.license}`;
    return `${name} / ${timestamp} / ${copyright} / ${license}`;
}

export default {
    mode: process.env.NODE_ENV || "production",
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
    externals: {
        synaptic: "synaptic",
    },
    optimization: {
        minimize: false,
    },
    devtool: "source-map",
    plugins: [
        new ReplacePlugin({
            exclude: /node_modules/,
            values: {
                "process.env.INFLECTION_RULES": JSON.stringify(macro.INFLECTION_RULES),
                "process.env.POS_NN_A_YA_STRUCTURE": JSON.stringify(macro.POS_NN_A_YA_STRUCTURE),
                "process.env.POS_NN_A_YA_CACHE": JSON.stringify(macro.POS_NN_A_YA_CACHE),
                "process.env.POS_NN_OI_YI_II_STRUCTURE": JSON.stringify(macro.POS_NN_OI_YI_II_STRUCTURE),
                "process.env.POS_NN_OI_YI_II_CACHE": JSON.stringify(macro.POS_NN_OI_YI_II_CACHE),
                "process.env.POS_NN_YH_STRUCTURE": JSON.stringify(macro.POS_NN_YH_STRUCTURE),
                "process.env.POS_NN_YH_CACHE": JSON.stringify(macro.POS_NN_YH_CACHE),
            },
        }),
        new webpack.BannerPlugin(getBanner(pkg)),
    ],
};
