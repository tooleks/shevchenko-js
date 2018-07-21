"use strict";

const rules = require("./rules");
const {isValidPos, NeuralNetwork} = require("./src/pos/NeuralNetwork");

const posNnAYaStructure = require("./nn/pos-a-ya/structure.json");
const posNnAYa = new NeuralNetwork(posNnAYaStructure);
const posNnAYaCache = require("./nn/pos-a-ya/data/samples.json")
    .filter((sample) => isValidPos(sample.pos))
    .filter((sample) => sample.pos !== posNnAYa.run(sample.value))
    .reduce((cache, sample) => {
        cache[sample.value] = sample.pos;
        return cache;
    }, {});

const posNnOiYiIiStructure = require("./nn/pos-oi-yi-ii/structure.json");
const posNnOiYiIi = new NeuralNetwork(posNnOiYiIiStructure);
const posNnOiYiIiCache = require("./nn/pos-oi-yi-ii/data/samples.json")
    .filter((sample) => isValidPos(sample.pos))
    .filter((sample) => sample.pos !== posNnOiYiIi.run(sample.value))
    .reduce((cache, sample) => {
        cache[sample.value] = sample.pos;
        return cache;
    }, {});

const posNnYhStructure = require("./nn/pos-yh/structure.json");
const posNnYh = new NeuralNetwork(posNnYhStructure);
const posNnYhCache = require("./nn/pos-yh/data/samples.json")
    .filter((sample) => isValidPos(sample.pos))
    .filter((sample) => sample.pos !== posNnYh.run(sample.value))
    .reduce((cache, sample) => {
        cache[sample.value] = sample.pos;
        return cache;
    }, {});

module.exports = {
    RULES: JSON.stringify(rules),
    POS_NN_A_YA_STRUCTURE: JSON.stringify(posNnAYaStructure),
    POS_NN_A_YA_CACHE: JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnAYaCache),
    POS_NN_OI_YI_II_STRUCTURE: JSON.stringify(posNnOiYiIiStructure),
    POS_NN_OI_YI_II_CACHE: JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnOiYiIiCache),
    POS_NN_YH_STRUCTURE: JSON.stringify(posNnYhStructure),
    POS_NN_YH_CACHE: JSON.stringify(process.env.NODE_ENV === "test" ? {} : posNnYhCache),
};
