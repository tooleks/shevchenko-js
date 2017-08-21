"use strict";

const Pos = require("../dist/module/pos");
const NeuralNetwork = require("../dist/module/pos/neural-network");

const results = require("./data/samples.json")
    .filter((sample) => NeuralNetwork.getPosNames().indexOf(sample.pos) !== -1)
    .map((sample) => Pos.resolve(sample.value) === sample.pos);

const correctResults = results.filter((result) => result);
const incorrectResults = results.filter((result) => !result);

console.log(`Correct results ${correctResults.length * 100 / results.length}%.`);
console.log(`Incorrect results ${incorrectResults.length * 100 / results.length}%.`);
