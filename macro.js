"use strict";

const NeuralNetwork = require("./src/pos/neural-network");

const inflectionRules = require("./rules");

const posNnAYaStructure = require("./nn/pos-a-ya/data/structure.json");
const posNnAYa = new NeuralNetwork(posNnAYaStructure);
const posNnAYaCache = require("./nn/pos-a-ya/data/samples.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .filter((sample) => sample.pos !== posNnAYa.run(sample.value))
    .reduce((accumulator, sample) => (accumulator[sample.value] = sample.pos, accumulator), {});

module.exports = {
    "__inflection_rules__": JSON.stringify(inflectionRules),
    "__pos_nn_a_ya_structure___": JSON.stringify(posNnAYaStructure),
    "__pos_nn_a_ya_cache__": JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnAYaCache),
};
