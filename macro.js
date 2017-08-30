"use strict";

const NeuralNetwork = require("./src/pos/neural-network");

const inflectionRules = require("./rules");

const posNnAYaStructure = require("./nn/pos-a-ya/data/structure.json");
const posNnAYa = new NeuralNetwork(posNnAYaStructure);
const posNnAYaCache = require("./nn/pos-a-ya/data/samples.json")
    .filter((item) => NeuralNetwork.isValidPosName(item.pos))
    .filter((item) => item.pos !== posNnAYa.run(item.value))
    .reduce((accumulator, item) => (accumulator[item.value] = item.pos, accumulator), {});

const posNnCache = [].concat(posNnAYaCache);

module.exports = {
    "__inflection_rules__": JSON.stringify(inflectionRules),
    "__pos_nn_a_ya_structure___": JSON.stringify(posNnAYaStructure),
    "__pos_nn_cache__": JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnCache),
};
