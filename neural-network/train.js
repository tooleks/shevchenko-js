"use strict";

const fs = require("fs");
const NeuralNetwork = require("../dist/module/pos/neural-network");

/**
 * Normalize an array of training data for a neural network.
 *
 * @param {Array<Object>} samples
 * @return {Array}
 */
function normalizeTrainingData(samples) {
    return samples
        .filter((sample) => NeuralNetwork.getPosNames().indexOf(sample.pos) !== -1)
        .map((sample) => {
            return {
                input: NeuralNetwork.normalizeInput(sample.value),
                output: NeuralNetwork.normalizeOutput(sample.pos),
            };
        });
}

const samples = normalizeTrainingData(require("./input/pos.json"));

const neuralNetworkStructure = NeuralNetwork.build(samples, {
    rate: 0.1,
    iterations: 300,
    shuffle: true,
    error: 0.05,
    log: 1,
});

fs.writeFile(__dirname + "/output/pos.json", JSON.stringify(neuralNetworkStructure), (error) => {
    if (error) throw error;
});
