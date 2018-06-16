"use strict";

const name = require("./name");
const regexp = require("./regexp");
const string = require("./string");

module.exports = {regexp, string, ...name};
