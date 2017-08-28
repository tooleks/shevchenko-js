"use strict";

const NeuralNetwork = require("./src/pos/neural-network");

module.exports = {
    "__rules__": JSON.stringify(
        require("./rules")
    ),
    "__pos_nn_structure__a_ja__": JSON.stringify(
        require("./nn/pos-a-ja/data/structure.json")
    ),
    "__pos_nn_cache__": JSON.stringify(
        process.env.NODE_ENV === "test"
            ? {}
            : []
            .concat(require("./nn/pos-a-ja/data/samples.json"))
            .filter((item) => NeuralNetwork.isValidPosName(item.pos))
            .reduce((accumulator, item) => (accumulator[item.value] = item.pos, accumulator), {})
    ),
};
