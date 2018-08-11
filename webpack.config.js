"use strict";

// Use esm npm package to enable support for es modules in Node.js now.
// For additional details see https://www.npmjs.com/package/esm.
require = require("esm")(module);

const webpackConfig = require("./webpack/webpack.config");

module.exports = webpackConfig;
