"use strict";

const assert = require("assert");
const pos = require("../dist/module/pos");
const NeuralNetwork = require("../dist/module/pos/neural-network");
const samples = require("../neural-networks/pos/data/training-data.json");

describe("#pos.NeuralNetwork learning rate", () => {
    it("should have learning rate value >= 0.95", () => {
        const results = samples
            .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
            .map((sample) => pos.resolve(sample.value, false) === sample.pos);
        const correctResults = results.filter((result) => result);
        const learningRate = correctResults.length / results.length;
        assert(learningRate >= 0.95, `The learn rate value is too low: ${learningRate}.`);
    });
});
