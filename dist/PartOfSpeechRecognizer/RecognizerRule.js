"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecognizerRule {
    constructor(condition, neuralNetwork, cache) {
        this.condition = condition;
        this.neuralNetwork = neuralNetwork;
        this.cache = cache;
    }
    /**
     * Applies the part of speech recognizer rule to a given word.
     * Returns a part of speech of a given word.
     * Returns null if a part of speech was not recognized.
     */
    apply(word) {
        if (this.cache[word] != null) {
            return this.cache[word];
        }
        return this.neuralNetwork.activate(word);
    }
}
exports.default = RecognizerRule;
//# sourceMappingURL=RecognizerRule.js.map