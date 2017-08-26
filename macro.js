const rules = require("./rules");
const posNeuralNetworkStructure = require("./neural-networks/pos/data/structure.json");
const NeuralNetwork = require("./src/pos/neural-network");

const posNeuralNetworkCache = []
    .concat(require("./neural-networks/pos/data/training-data.json"))
    .concat(require("./neural-networks/pos/data/cache.json"))
    .filter((sample) => NeuralNetwork.isValidPosName(sample.pos))
    .reduce((accumulator, sample) => (accumulator[sample.value] = sample.pos, accumulator), {});

module.exports = {
    "__rules__": JSON.stringify(rules),
    "__pos_neural_network_structure__": JSON.stringify(posNeuralNetworkStructure),
    "__pos_neural_network_cache__": JSON.stringify(posNeuralNetworkCache),
};
