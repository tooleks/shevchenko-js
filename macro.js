"use strict";

const {isValidPos, NeuralNetwork} = require("./src/pos/NeuralNetwork");

const INFLECTION_RULES = require("./rules");

const POS_NN_A_YA_STRUCTURE = require("./nn/POS_A_YA/structure");
const POS_NN_A_YA = new NeuralNetwork(POS_NN_A_YA_STRUCTURE);
const POS_NN_A_YA_CACHE = require("./nn/POS_A_YA/data/samples")
    .filter((sample) => isValidPos(sample.pos))
    .filter((sample) => sample.pos !== POS_NN_A_YA.run(sample.value))
    .reduce((cache, sample) => {
        cache[sample.value] = sample.pos;
        return cache;
    }, {});

const POS_NN_OI_YI_II_STRUCTURE = require("./nn/POS_OI_YI_II/structure");
const POS_NN_OI_YI_II = new NeuralNetwork(POS_NN_OI_YI_II_STRUCTURE);
const POS_NN_OI_YI_II_CACHE = require("./nn/POS_OI_YI_II/data/samples")
    .filter((sample) => isValidPos(sample.pos))
    .filter((sample) => sample.pos !== POS_NN_OI_YI_II.run(sample.value))
    .reduce((cache, sample) => {
        cache[sample.value] = sample.pos;
        return cache;
    }, {});

const POS_NN_YH_STRUCTURE = require("./nn/POS_YH/structure");
const POS_NN_YH = new NeuralNetwork(POS_NN_YH_STRUCTURE);
const POS_NN_YH_CACHE = require("./nn/POS_YH/data/samples")
    .filter((sample) => isValidPos(sample.pos))
    .filter((sample) => sample.pos !== POS_NN_YH.run(sample.value))
    .reduce((cache, sample) => {
        cache[sample.value] = sample.pos;
        return cache;
    }, {});

module.exports = {
    INFLECTION_RULES,
    POS_NN_A_YA_STRUCTURE: POS_NN_A_YA_STRUCTURE,
    POS_NN_A_YA_CACHE: process.env.NODE_ENV === "test" ? {} : POS_NN_A_YA_CACHE,
    POS_NN_OI_YI_II_STRUCTURE: POS_NN_OI_YI_II_STRUCTURE,
    POS_NN_OI_YI_II_CACHE: process.env.NODE_ENV === "test" ? {} : POS_NN_OI_YI_II_CACHE,
    POS_NN_YH_STRUCTURE: POS_NN_YH_STRUCTURE,
    POS_NN_YH_CACHE: process.env.NODE_ENV === "test" ? {} : POS_NN_YH_CACHE,
};
