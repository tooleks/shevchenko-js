import path from "path";
import webpackMerge from "webpack-merge";
import commonConfig from "./common.config";
import pkg from "../package.json";

export default webpackMerge(commonConfig, {
    entry: path.resolve(__dirname, "../src/api.js"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: `${pkg.name}.cjs.js`,
        library: pkg.name,
        libraryTarget: "commonjs2",
    },
});
