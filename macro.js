import INFLECTION_RULES from './rules';
import POS_NN_A_YA_STRUCTURE from './nn/POS_A_YA/structure.json';
import POS_NN_A_YA_SAMPLES from './nn/POS_A_YA/samples.json';
import POS_NN_OI_YI_II_STRUCTURE from './nn/POS_OI_YI_II/structure.json';
import POS_NN_OI_YI_II_SAMPLES from './nn/POS_OI_YI_II/samples.json';
import POS_NN_YH_STRUCTURE from './nn/POS_YH/structure.json';
import POS_NN_YH_SAMPLES from './nn/POS_YH/samples.json';
import NeuralNetwork from './src/services/pos/NeuralNetwork';

/**
 * Add a sample to the cache.
 *
 * @param {object} cache
 * @param {object} sample
 * @returns {object}
 */
function addSampleToCache(cache, sample) {
  cache[sample.value] = sample.pos;
  return cache;
}

const POS_NN_A_YA = new NeuralNetwork(POS_NN_A_YA_STRUCTURE);
const POS_NN_A_YA_CACHE = {};

const POS_NN_OI_YI_II = new NeuralNetwork(POS_NN_OI_YI_II_STRUCTURE);
const POS_NN_OI_YI_II_CACHE = {};

const POS_NN_YH = new NeuralNetwork(POS_NN_YH_STRUCTURE);
const POS_NN_YH_CACHE = {};

if (!process.env.NO_CACHE) {
  POS_NN_A_YA_SAMPLES.filter((sample) => sample.pos !== POS_NN_A_YA.run(sample.value)).reduce(
    addSampleToCache,
    POS_NN_A_YA_CACHE,
  );

  POS_NN_OI_YI_II_SAMPLES.filter((sample) => sample.pos !== POS_NN_OI_YI_II.run(sample.value)).reduce(
    addSampleToCache,
    POS_NN_OI_YI_II_CACHE,
  );

  POS_NN_YH_SAMPLES.filter((sample) => sample.pos !== POS_NN_YH.run(sample.value)).reduce(
    addSampleToCache,
    POS_NN_YH_CACHE,
  );
}

export default {
  INFLECTION_RULES,
  POS_NN_A_YA_STRUCTURE,
  POS_NN_A_YA_CACHE,
  POS_NN_OI_YI_II_STRUCTURE,
  POS_NN_OI_YI_II_CACHE,
  POS_NN_YH_STRUCTURE,
  POS_NN_YH_CACHE,
};
