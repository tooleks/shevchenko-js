import fs from 'fs';
import path from 'path';
import NeuralNetwork from '../../src/services/pos/nn/NeuralNetwork';
import * as neuralNetworkUtil from '../../src/services/pos/nn/neuralNetworkUtil';

/**
 * @type {Array}
 */
import samples from './samples.json';

/**
 * @type {object}
 */
import structure from './structure.json';

const sampleData = samples
  .filter((sample) => neuralNetworkUtil.isValidPos(sample.pos))
  .map((sample) => {
    const input = neuralNetworkUtil.encodeInput(sample.value);
    const output = neuralNetworkUtil.encodeOutput(sample.pos);
    return {input, output};
  });

const options = {
  rate: 0.01,
  iterations: 1000,
  shuffle: true,
  error: 0.005,
  log: 1,
};

const neuralNetwork =
  process.argv[2] !== 'force'
    ? new NeuralNetwork(structure).train(sampleData, options)
    : NeuralNetwork.build(sampleData, options);

fs.writeFileSync(path.join(__dirname, 'structure.json'), String(neuralNetwork));
