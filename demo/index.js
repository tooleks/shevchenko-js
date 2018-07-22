"use strict";

const path = require("path");

// Load environment variables from .env file into a process.env variable.
require("dotenv").config({path: path.join(__dirname, ".env")});

// Use esm npm package to enable support for es modules in Node.js now.
// For additional details see https://www.npmjs.com/package/esm.
require = require("esm")(module);

// Require the application es module entry point.
module.exports = require("./server");
