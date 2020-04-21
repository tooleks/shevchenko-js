"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NameInflector {
    /**
     * Inflects a given name in a given grammatical case.
     */
    inflect(name, gender, grammaticalCase) {
        const words = name.split('-');
        return words
            .map((word, wordIndex) => this.inflectName(word, gender, grammaticalCase, wordIndex === words.length - 1))
            .join('-');
    }
}
exports.default = NameInflector;
//# sourceMappingURL=NameInflector.js.map