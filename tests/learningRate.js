import assert from 'assert';

/**
 * A neural network structure for female last names with endings "-a", "-я".
 *
 * @type {object}
 */
import POS_NN_A_YA_STRUCTURE from '../nn/POS_A_YA/structure.json';

/**
 * A neural network samples for female last names with endings "-a", "-я".
 *
 * @type {Array<object>}
 */
import POS_NN_A_YA_SAMPLES from '../nn/POS_A_YA/samples.json';

/**
 * A neural network structure for male last names with endings "-ой", "-ий", "-ій".
 *
 * @type {object}
 */
import POS_NN_OI_YI_II_STRUCTURE from '../nn/POS_OI_YI_II/structure.json';

/**
 * A neural network samples for male last names with endings "-ой", "-ий", "-ій".
 *
 * @type {Array<object>}
 */
import POS_NN_OI_YI_II_SAMPLES from '../nn/POS_OI_YI_II/samples.json';

/**
 * A neural network structure for male last names with endings "-их".
 *
 * @type {object}
 */
import POS_NN_YH_STRUCTURE from '../nn/POS_YH/structure.json';

/**
 * A neural network samples for male last names with endings "-их".
 *
 * @type {Array<object>}
 */
import POS_NN_YH_SAMPLES from '../nn/POS_YH/samples.json';

import NeuralNetwork from '../src/services/pos/nn/NeuralNetwork';

export default function() {
  describe('Part of speech neural networks learning rate tests', function() {
    const timeout = 2 * 60 * 1000; // 2 minutes in milliseconds
    const minLearningRate = 0.95;

    it(`Part of speech neural network for for female last names with endings "-a", "-я" should have learning rate >= ${minLearningRate}`, function() {
      this.timeout(timeout);

      const neuralNetwork = new NeuralNetwork(POS_NN_A_YA_STRUCTURE);
      const correctPredictions = POS_NN_A_YA_SAMPLES.reduce((correctPredictions, sample) => {
        const correctPrediction = sample.pos === neuralNetwork.run(sample.value);
        if (correctPrediction) {
          correctPredictions++;
        }
        return correctPredictions;
      }, 0);

      const learningRate = correctPredictions / POS_NN_A_YA_SAMPLES.length;

      assert(learningRate >= minLearningRate, `The learning rate is too low: ${learningRate}.`);
    });

    it(`Part of speech neural network for for male last names with endings "-ой", "-ий", "-ій" should have learning rate >= ${minLearningRate}`, function() {
      this.timeout(timeout);

      const neuralNetwork = new NeuralNetwork(POS_NN_OI_YI_II_STRUCTURE);
      const correctPredictions = POS_NN_OI_YI_II_SAMPLES.reduce((correctPredictions, sample) => {
        const correctPrediction = sample.pos === neuralNetwork.run(sample.value);
        if (correctPrediction) {
          correctPredictions++;
        }
        return correctPredictions;
      }, 0);

      const learningRate = correctPredictions / POS_NN_OI_YI_II_SAMPLES.length;

      assert(learningRate >= minLearningRate, `The learning rate is too low: ${learningRate}.`);
    });

    it(`Part of speech neural network for for male last names with endings "-их" should have learning rate >= ${minLearningRate}`, function() {
      this.timeout(timeout);

      const neuralNetwork = new NeuralNetwork(POS_NN_YH_STRUCTURE);
      const correctPredictions = POS_NN_YH_SAMPLES.reduce((correctPredictions, sample) => {
        const correctPrediction = sample.pos === neuralNetwork.run(sample.value);
        if (correctPrediction) {
          correctPredictions++;
        }
        return correctPredictions;
      }, 0);

      const learningRate = correctPredictions / POS_NN_YH_SAMPLES.length;

      assert(learningRate >= minLearningRate, `The learning rate is too low: ${learningRate}.`);
    });
  });
}
