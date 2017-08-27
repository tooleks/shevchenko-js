"use strict";

const fs = require("fs");
const NeuralNetwork = require("../../src/pos/neural-network");

const posNeuralNetwork = new NeuralNetwork(require("./data/structure.json"));

if (typeof process.argv[2] === "undefined" || typeof process.argv[3] === "undefined") {
    throw new Error("Missed value or pos parameter.");
}

const value = process.argv[2].toLowerCase().trim();
const pos = process.argv[3].toLowerCase().trim();

if (require("./data/samples.json").filter((sample) => sample.value === value).length) {
    throw new Error("Value already exists.");
}

const samples = [{value, pos}];
const trainingData = samples
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .map((sample) => {
        return {
            input: NeuralNetwork.normalizeInput(sample.value),
            output: NeuralNetwork.normalizeOutput(sample.pos),
        };
    });

posNeuralNetwork.train(trainingData, {
    rate: 0.00019890243387724,
    iterations: 4000,
    shuffle: true,
    error: 0.009,
    log: 1,
});

fs.writeFileSync(__dirname + "/data/samples.json", JSON.stringify([].concat(require("./data/samples.json")).concat(samples)));
fs.writeFileSync(__dirname + "/data/structure.json", posNeuralNetwork.toString());

console.log("Done.");
