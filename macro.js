"use strict";

const NeuralNetwork = require("./src/pos/neural-network");

module.exports = {
    "__rules__": JSON.stringify(
        require("./rules")
    ),
    "__pos_neural_network_structure__": JSON.stringify(
        require("./neural-networks/pos-а_я/data/structure.json")
    ),
    "__pos_neural_network_cache__": JSON.stringify(
        process.env.NODE_ENV === "test"
            ? {}
            : require("./neural-networks/pos-а_я/data/samples.json")
            .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
            .reduce((accumulator, sample) => (accumulator[sample.value] = sample.pos, accumulator), {})
    ),
};
