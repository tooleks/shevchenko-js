"use strict";

const NeuralNetwork = require("./src/pos/neural-network");

const rules = require("./rules");

const posNnAYaStructure = require("./nn/pos-a-ya/structure.json");
const posNnAYa = new NeuralNetwork(posNnAYaStructure);
const posNnAYaCache = require("./nn/pos-a-ya/data/samples.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .filter((sample) => sample.pos !== posNnAYa.run(sample.value))
    .reduce((cache, sample) => (cache[sample.value] = sample.pos, cache), {});

const posNnOiYiIiStructure = require("./nn/pos-oi-yi-ii/structure.json");
const posNnOiYiIi = new NeuralNetwork(posNnOiYiIiStructure);
const posNnOiYiIiCache = require("./nn/pos-oi-yi-ii/data/samples.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .filter((sample) => sample.pos !== posNnOiYiIi.run(sample.value))
    .reduce((cache, sample) => (cache[sample.value] = sample.pos, cache), {});

const posNnYhStructure = require("./nn/pos-yh/structure.json");
const posNnYh = new NeuralNetwork(posNnYhStructure);
const posNnYhCache = require("./nn/pos-yh/data/samples.json")
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .filter((sample) => sample.pos !== posNnYh.run(sample.value))
    .reduce((cache, sample) => (cache[sample.value] = sample.pos, cache), {});

module.exports = {
    "__rules__": JSON.stringify(rules),

    "__pos_nn_a_ya_structure__": JSON.stringify(posNnAYaStructure),
    "__pos_nn_a_ya_cache__": JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnAYaCache),

    "__pos_nn_oi_yi_ii_structure__": JSON.stringify(posNnOiYiIiStructure),
    "__pos_nn_oi_yi_ii_cache__": JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnOiYiIiCache),

    "__pos_nn_yh_structure__": JSON.stringify(posNnYhStructure),
    "__pos_nn_yh_cache__": JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnYhCache),
};
