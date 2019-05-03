import NeuralNetwork from './NeuralNetwork';
import InMemoryCache from '../../util/InMemoryCache';

export default class RecognizerRule {
  /**
   * @param {function} applicable
   * @param {object} structure
   * @param {object} [cache]
   */
  constructor(applicable, structure, cache = {}) {
    this._applicable = applicable;
    this._neuralNetwork = new NeuralNetwork(structure);
    this._cache = new InMemoryCache(cache);
  }

  /**
   * Determines whether the part of speech recognizer rule is applicable or not.
   *
   * @param {string} word
   * @param {Gender} gender
   * @returns {boolean}
   */
  applicable(word, gender) {
    return this._applicable(word, gender);
  }

  /**
   * Recognizes part of speech of the word.
   *
   * @param {string} word
   * @param {Gender} gender
   */
  recognize(word, gender) {
    if (!this._cache.hasItem(word)) {
      const pos = this._neuralNetwork.run(word);
      this._cache.setItem(word, pos);
    }
    return this._cache.getItem(word);
  }
}
