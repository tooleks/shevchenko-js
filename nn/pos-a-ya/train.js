"use strict";

const fs = require("fs");
const NeuralNetwork = require("../../src/pos/neural-network");

const trainingData = require("./data/samples.json")
    .filter((item) => NeuralNetwork.isValidPosName(item.pos))
    .map((item) => {
        return {
            input: NeuralNetwork.normalizeInput(item.value),
            output: NeuralNetwork.normalizeOutput(item.pos),
        };
    });

const posNeuralNetwork = NeuralNetwork
    .build(trainingData, {
        rate: 0.02919890243387724,
        iterations: 400,
        shuffle: true,
        error: 0.009,
        log: 1,
    });

fs.writeFileSync(__dirname + "/data/structure.json", posNeuralNetwork.toString());

console.log("Done.");
