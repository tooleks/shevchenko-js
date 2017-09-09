"use strict";

const fs = require("fs");
const util = require("../../src/util");
const samples = require("./data/samples.json");

const array = util.array;

if (typeof process.argv[2] === "undefined" || typeof process.argv[3] === "undefined") {
    throw new Error("Missed value or pos parameter.");
}

const newSample = {
    value: process.argv[2].toLowerCase().trim(),
    pos: process.argv[3].toLowerCase().trim(),
};


if (samples.filter((sample) => sample.value === newSample.value).length) {
    throw new Error("Value already exists.");
}

samples.push(newSample);

fs.writeFileSync(__dirname + "/data/samples.json", JSON.stringify(array.unique(samples)));
