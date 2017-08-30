"use strict";

const fs = require("fs");
const NeuralNetwork = require("../../src/pos/neural-network");

const posNn = new NeuralNetwork(require("./data/structure.json"));

if (typeof process.argv[2] === "undefined" || typeof process.argv[3] === "undefined") {
    throw new Error("Missed value or pos parameter.");
}

const value = process.argv[2].toLowerCase().trim();
const pos = process.argv[3].toLowerCase().trim();

if (require("./data/samples.json").filter((item) => item.value === value).length) {
    throw new Error("Value already exists.");
}

const samples = [{value, pos}];
const trainingData = samples
    .filter((item) => NeuralNetwork.isValidPosName(item.pos))
    .map((item) => {
        return {
            input: NeuralNetwork.normalizeInput(item.value),
            output: NeuralNetwork.normalizeOutput(item.pos),
        };
    });

posNn.train(trainingData, {
    rate: 0.00019890243387724,
    iterations: 4000,
    shuffle: true,
    error: 0.009,
    log: 1,
});

fs.writeFileSync(__dirname + "/data/samples.json", JSON.stringify([].concat(require("./data/samples.json")).concat(samples)));
fs.writeFileSync(__dirname + "/data/structure.json", posNn.toString());

console.log("Done.");
