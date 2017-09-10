"use strict";

const NeuralNetwork = require("./src/pos/neural-network");

const inflectionRules = require("./rules");

const posNnAYaStructure = require("./nn/pos-a-ya/structure.json");
const posNnAYa = new NeuralNetwork(posNnAYaStructure);
const posNnAYaCache = require("./nn/pos-a-ya/data/samples.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .filter((sample) => sample.pos !== posNnAYa.run(sample.value))
    .reduce((cache, sample) => (cache[sample.value] = sample.pos, cache), {});

const posNnYiIiStructure = require("./nn/pos-yi-ii/structure.json");
const posNnYiIi = new NeuralNetwork(posNnYiIiStructure);
const posNnYiIiCache = require("./nn/pos-yi-ii/data/samples.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .filter((sample) => sample.pos !== posNnYiIi.run(sample.value))
    .reduce((cache, sample) => (cache[sample.value] = sample.pos, cache), {});

module.exports = {
    "__inflection_rules__": JSON.stringify(inflectionRules),

    "__pos_nn_a_ya_structure___": JSON.stringify(posNnAYaStructure),
    "__pos_nn_a_ya_cache__": JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnAYaCache),

    "__pos_nn_yi_ii_structure___": JSON.stringify(posNnYiIiStructure),
    "__pos_nn_yi_ii_cache__": JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnYiIiCache),
};
