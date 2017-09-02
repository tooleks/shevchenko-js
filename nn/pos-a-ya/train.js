"use strict";

const fs = require("fs");
const NeuralNetwork = require("../../src/pos/neural-network");

const trainingData = require("./data/samples.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .map((sample) => {
        return {
            input: NeuralNetwork.normalizeInput(sample.value),
            output: NeuralNetwork.normalizeOutput(sample.pos),
        };
    });

const posNn = NeuralNetwork
    .build(trainingData, {
        rate: 0.02919890243387724,
        iterations: 1000,
        shuffle: true,
        error: 0.009,
        log: 1,
    });

fs.writeFileSync(__dirname + "/data/structure.json", posNn.toString());

console.log("Done.");
