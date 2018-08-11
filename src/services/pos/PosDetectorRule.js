import NeuralNetwork from "./nn/NeuralNetwork";
import InMemoryCache from "../util/InMemoryCache";

export default class PosDetectorRule {
    /**
     * PosDetectorRule constructor.
     *
     * @param {function} isApplicable
     * @param {object} structure
     * @param {object} [cache={}]
     */
    constructor(isApplicable, structure, cache = {}) {
        this._isApplicable = isApplicable;
        this._neuralNetwork = new NeuralNetwork(structure);
        this._cache = new InMemoryCache(cache);
        this.isApplicable = this.isApplicable.bind(this);
        this.recognize = this.recognize.bind(this);
    }

    /**
     * Test if the part of speech recognizer step is applicable.
     *
     * @param {string} word
     * @param {Gender} gender
     * @return {boolean}
     */
    isApplicable(word, gender) {
        return this._isApplicable(word, gender);
    }

    /**
     * Recognize part of speech of the word.
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
