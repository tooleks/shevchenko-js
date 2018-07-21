"use strict";

const assert = require("assert");
const {isValidPos, NeuralNetwork} = require("../dist/__NeuralNetwork__");

describe("pos neural networks learning rate tests", function() {
    it("posNnAYa should have learning rate value >= 0.95", function() {
        const posNnAYa = new NeuralNetwork(require("../nn/POS_A_YA/structure.json"));
        const predictions = require("../nn/POS_A_YA/data/samples.json")
            .filter((sample) => isValidPos(sample.pos))
            .map((sample) => sample.pos === posNnAYa.run(sample.value));

        const correctPredictions = predictions.filter((prediction) => prediction);
        const learningRate = correctPredictions.length / predictions.length;

        assert(learningRate >= 0.95, `The learn rate value is too low: ${learningRate}.`);
    });

    it("posNnOiYiIi should have learning rate value >= 0.95", function() {
        const posNnOiYiIi = new NeuralNetwork(require("../nn/POS_OI_YI_II/structure.json"));
        const predictions = require("../nn/POS_OI_YI_II/data/samples.json")
            .filter((sample) => isValidPos(sample.pos))
            .map((sample) => sample.pos === posNnOiYiIi.run(sample.value));

        const correctPredictions = predictions.filter((prediction) => prediction);
        const learningRate = correctPredictions.length / predictions.length;

        assert(learningRate >= 0.95, `The learn rate value is too low: ${learningRate}.`);
    });

    it("posNnYh should have learning rate value >= 0.95", function() {
        const posNnYh = new NeuralNetwork(require("../nn/POS_YH/structure.json"));
        const predictions = require("../nn/POS_YH/data/samples.json")
            .filter((sample) => isValidPos(sample.pos))
            .map((sample) => sample.pos === posNnYh.run(sample.value));

        const correctPredictions = predictions.filter((prediction) => prediction);
        const learningRate = correctPredictions.length / predictions.length;

        assert(learningRate >= 0.95, `The learn rate value is too low: ${learningRate}.`);
    });
});
