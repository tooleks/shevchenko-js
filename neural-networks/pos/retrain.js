"use strict";

const fs = require("fs");
const NeuralNetwork = require("../../src/pos/neural-network");

const posNeuralNetwork = new NeuralNetwork(require("./data/structure.json"));

const samples = require("./data/new-training-data.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .map((sample) => {
        return {
            input: NeuralNetwork.normalizeInput(sample.value),
            output: NeuralNetwork.normalizeOutput(sample.pos),
        };
    });

posNeuralNetwork.train(samples, {
    rate: 0.00019890243387724,
    iterations: 4000,
    shuffle: true,
    error: 0.009,
    log: 1,
});

fs.writeFileSync(__dirname + "/data/training-data.json", JSON.stringify([].concat(require("./data/training-data.json")).concat(require("./data/new-training-data.json"))));
fs.writeFileSync(__dirname + "/data/new-training-data.json", JSON.stringify([]));
fs.writeFileSync(__dirname + "/data/structure.json", posNeuralNetwork.toString());

console.log("Done.");
