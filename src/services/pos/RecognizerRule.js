import NeuralNetwork from "./NeuralNetwork";
import InMemoryCache from "../../util/InMemoryCache";

export default class RecognizerRule {
  /**
   * @param {function} applicable
   * @param {object} structure
   * @param {object} [cache]
   */
  constructor(applicable, structure, cache = {}) {
    this.applicable = applicable;
    this.neuralNetwork = new NeuralNetwork(structure);
    this.cache = new InMemoryCache(cache);
  }

  /**
   * Recognizes part of speech of the word.
   *
   * @param {string} word
   * @param {GENDER} gender
   */
  recognize(word, gender) {
    if (!this.cache.hasItem(word)) {
      const pos = this.neuralNetwork.run(word);
      this.cache.setItem(word, pos);
    }
    return this.cache.getItem(word);
  }
}
