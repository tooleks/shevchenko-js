"use strict";

const fs = require("fs");
const NeuralNetwork = require("../../src/pos/neural-network");

const samples = require("./data/samples.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .map((sample) => {
        return {
            input: NeuralNetwork.normalizeInput(sample.value),
            output: NeuralNetwork.normalizeOutput(sample.pos),
        };
    });

const posNeuralNetwork = NeuralNetwork
    .build(samples, {
        rate: 0.02919890243387724,
        iterations: 400,
        shuffle: true,
        error: 0.009,
        log: 1,
    });

fs.writeFileSync(__dirname + "/data/structure.json", posNeuralNetwork.toString());

console.log("Done.");
