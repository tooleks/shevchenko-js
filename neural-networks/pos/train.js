"use strict";

const fs = require("fs");
const NeuralNetwork = require("../../dist/module/pos/neural-network");

const samples = require("./data/samples.json")
    .filter((sample) => NeuralNetwork.getPosNames().indexOf(sample.pos) !== -1)
    .map((sample) => {
        return {
            input: NeuralNetwork.normalizeInput(sample.value),
            output: NeuralNetwork.normalizeOutput(sample.pos),
        };
    });

const neuralNetworkStructure = NeuralNetwork.build(samples, {
    rate: 0.1,
    iterations: 300,
    shuffle: true,
    error: 0.05,
    log: 1,
});

fs.writeFile(__dirname + "/data/structure.json", JSON.stringify(neuralNetworkStructure), (error) => {
    if (error) throw error;
});
