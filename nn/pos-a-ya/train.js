"use strict";

const fs = require("fs");
const NeuralNetwork = require("../../src/pos/neural-network");

const data = require("./data/samples.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .map((sample) => {
        return {
            input: NeuralNetwork.normalizeInput(sample.value),
            output: NeuralNetwork.normalizeOutput(sample.pos),
        };
    });

const options = {
    rate: 0.01,
    iterations: 1000,
    shuffle: true,
    error: 0.005,
    log: 1,
};

const posNn = process.argv[2] !== "force"
    ? new NeuralNetwork(require("./structure.json")).train(data, options)
    : NeuralNetwork.build(data, options);

fs.writeFileSync(__dirname + "/structure.json", posNn.toString());
