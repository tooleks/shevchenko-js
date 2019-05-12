import moment from "moment";
import { expect } from "chai";
import POS_NN_A_YA_STRUCTURE from "../nn/POS_A_YA/structure.json";
import POS_NN_A_YA_SAMPLES from "../nn/POS_A_YA/samples.json";
import POS_NN_OI_YI_II_STRUCTURE from "../nn/POS_OI_YI_II/structure.json";
import POS_NN_OI_YI_II_SAMPLES from "../nn/POS_OI_YI_II/samples.json";
import POS_NN_YH_STRUCTURE from "../nn/POS_YH/structure.json";
import POS_NN_YH_SAMPLES from "../nn/POS_YH/samples.json";
import NeuralNetwork from "../src/services/pos/NeuralNetwork";

export default function() {
  describe("learning rate tests", function() {
    const timeout = moment.duration(2, "minutes").asMilliseconds();

    it(`should have high learning rate for "-a", "-я" neural network`, function() {
      this.timeout(timeout);

      const neuralNetwork = new NeuralNetwork(POS_NN_A_YA_STRUCTURE);
      let correctPredictions = 0;
      for (let sample of POS_NN_A_YA_SAMPLES) {
        if (sample.pos === neuralNetwork.run(sample.value)) {
          correctPredictions++;
        }
      }

      const learningRate = correctPredictions / POS_NN_A_YA_SAMPLES.length;

      expect(learningRate).to.be.above(0.95);
    });

    it(`should have high learning rate for "-ой", "-ий", "-ій" neural network`, function() {
      this.timeout(timeout);

      const neuralNetwork = new NeuralNetwork(POS_NN_OI_YI_II_STRUCTURE);
      let correctPredictions = 0;
      for (let sample of POS_NN_OI_YI_II_SAMPLES) {
        if (sample.pos === neuralNetwork.run(sample.value)) {
          correctPredictions++;
        }
      }

      const learningRate = correctPredictions / POS_NN_OI_YI_II_SAMPLES.length;

      expect(learningRate).to.be.above(0.95);
    });

    it(`should have high learning rate for "-их" neural network`, function() {
      this.timeout(timeout);

      const neuralNetwork = new NeuralNetwork(POS_NN_YH_STRUCTURE);
      let correctPredictions = 0;
      for (let sample of POS_NN_YH_SAMPLES) {
        if (sample.pos === neuralNetwork.run(sample.value)) {
          correctPredictions++;
        }
      }

      const learningRate = correctPredictions / POS_NN_YH_SAMPLES.length;

      expect(learningRate).to.be.above(0.95);
    });
  });
}
