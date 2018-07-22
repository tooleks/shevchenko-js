"use strict";

const path = require("path");

require("dotenv").config({path: path.join(__dirname, ".env")});

require = require("esm")(module);

module.exports = require("./server");
