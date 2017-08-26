"use strict";

const fs = require("fs");
const NeuralNetwork = require("../../src/pos/neural-network");

const samples = require("./data/training-data.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .map((sample) => {
        return {
            input: NeuralNetwork.normalizeInput(sample.value),
            output: NeuralNetwork.normalizeOutput(sample.pos),
        };
    });

const structure = NeuralNetwork.build(samples, {
    rate: 0.02919890243387724,
    iterations: 300,
    shuffle: true,
    error: 0.01,
    log: 1,
});

fs.writeFile(__dirname + "/data/structure.json", JSON.stringify(structure), (error) => {
    if (error) throw error;
});
