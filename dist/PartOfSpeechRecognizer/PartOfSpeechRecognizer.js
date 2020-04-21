"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PartOfSpeechRecognizer {
    constructor(rules) {
        this.rules = rules;
    }
    /**
     * Recognizes the part of speech of a given word.
     * Returns part of speech of a given word.
     * Returns null if part of speech was not recognized.
     */
    recognize(word, gender) {
        const rule = this.rules.find(rule => rule.condition(word, gender));
        if (rule == null) {
            return null;
        }
        return rule.apply(word);
    }
}
exports.default = PartOfSpeechRecognizer;
//# sourceMappingURL=PartOfSpeechRecognizer.js.map