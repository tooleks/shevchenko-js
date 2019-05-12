import path from "path";
import webpackMerge from "webpack-merge";
import commonConfig from "./common.config";
import pkg from "../package.json";

export default webpackMerge(commonConfig, {
  entry: path.join(__dirname, "..", "src", "api", "entrypoint.js"),
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: `${pkg.name}.umd.js`,
    library: pkg.name,
    libraryTarget: "umd",
    libraryExport: "default",
    // Note: The following line is needed to be able to build "umd" module compatible with Node.js.
    globalObject: `typeof self !== 'undefined' ? self : this`,
  },
});
