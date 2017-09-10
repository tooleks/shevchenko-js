"use strict";

const fs = require("fs");
const assert = require("assert");
const NeuralNetwork = require("../dist/module/pos/neural-network");

describe("#pos learning rate", function () {
    it("posNnAYa should have learning rate value >= 0.95", function () {
        const posNnAYa = new NeuralNetwork(require("../nn/pos-a-ya/structure.json"));
        const predictions = require("../nn/pos-a-ya/data/samples.json")
            .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
            .map((sample) => sample.pos === posNnAYa.run(sample.value));

        const correctPredictions = predictions.filter((prediction) => prediction);
        const learningRate = correctPredictions.length / predictions.length;

        assert(learningRate >= 0.95, `The learn rate value is too low: ${learningRate}.`);
    });
    
    it("posNnYiIi should have learning rate value >= 0.95", function () {
        const posNnYiIi = new NeuralNetwork(require("../nn/pos-yi-ii/structure.json"));
        const predictions = require("../nn/pos-yi-ii/data/samples.json")
            .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
            .map((sample) => sample.pos === posNnYiIi.run(sample.value));

        const correctPredictions = predictions.filter((prediction) => prediction);
        const learningRate = correctPredictions.length / predictions.length;

        assert(learningRate >= 0.95, `The learn rate value is too low: ${learningRate}.`);
    });
});
