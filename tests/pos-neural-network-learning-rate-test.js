"use strict";

const fs = require("fs");
const assert = require("assert");
const pos = require("../dist/module/pos");
const NeuralNetwork = require("../dist/module/pos/neural-network");
const samples = require("../neural-networks/pos/data/samples.json");

describe("#pos.NeuralNetwork learning rate", () => {
    it("should have learning rate value >= 0.95", () => {
        const predictions = samples
            .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
            .map((sample) => sample.pos === pos.resolve(sample.value, false));
        const correctPredictions = predictions.filter((prediction) => prediction);
        const learningRate = correctPredictions.length / predictions.length;
        assert(learningRate >= 0.95, `The learn rate value is too low: ${learningRate}.`);

        // Store invalid samples into a file.
        const invalidResults = samples
            .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
            .filter((sample) => sample.pos !== pos.resolve(sample.value, false));
        fs.writeFileSync("invalid-samples.json", JSON.stringify(invalidResults));
    });
});
