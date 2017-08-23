const rules = require("./rules");
const posNeuralNetworkStructure = require("./neural-networks/pos/data/structure.json");
const posNeuralNetworkSamples = require("./neural-networks/pos/data/samples.json");
const NeuralNetwork = require("./src/pos/neural-network");

const posNeuralNetworkCache = {};
posNeuralNetworkSamples
    .filter((sample) => NeuralNetwork.getPosNames().indexOf(sample.pos) !== -1)
    .forEach((sample) => posNeuralNetworkCache[sample.value] = sample.pos);

module.exports = {
    "__rules__": JSON.stringify(rules),
    "__pos_neural_network_structure__": JSON.stringify(posNeuralNetworkStructure),
    "__pos_neural_network_cache__": JSON.stringify(posNeuralNetworkCache),
};
