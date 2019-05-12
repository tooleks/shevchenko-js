import fs from "fs";
import path from "path";
import NeuralNetwork from "../../src/services/pos/NeuralNetwork";
import * as neuralNetworkUtil from "../../src/services/pos/neuralNetworkUtil";
import rawSamples from "./samples.json";
import structure from "./structure.json";

const force = process.argv[2] === "force";

const samples = rawSamples
  .filter((sample) => neuralNetworkUtil.isValidPos(sample.pos))
  .map((sample) => {
    const input = neuralNetworkUtil.encodeInput(sample.value);
    const output = neuralNetworkUtil.encodeOutput(sample.pos);
    return { input, output };
  });

const options = {
  rate: 0.01,
  iterations: 1000,
  shuffle: true,
  error: 0.005,
  log: 1,
};

const neuralNetwork = force
  ? NeuralNetwork.build(samples, options)
  : new NeuralNetwork(structure).train(samples, options);

fs.writeFileSync(path.join(__dirname, "structure.json"), neuralNetwork.toString());
