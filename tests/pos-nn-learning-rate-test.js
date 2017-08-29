"use strict";

const fs = require("fs");
const assert = require("assert");
const pos = require("../dist/module/pos");
const NeuralNetwork = require("../dist/module/pos/neural-network");
const samples = require("../nn/pos-a-ya/data/samples.json");

describe("#pos.NeuralNetwork learning rate", () => {
    it("should have learning rate value >= 0.95", () => {
        const predictions = samples
            .filter((item) => NeuralNetwork.isValidPosName(item.pos))
            .map((item) => item.pos === pos.recognize(item.value, false));

        const correctPredictions = predictions.filter((prediction) => prediction);
        const learningRate = correctPredictions.length / predictions.length;

        assert(learningRate >= 0.95, `The learn rate value is too low: ${learningRate}.`);
    });
});
