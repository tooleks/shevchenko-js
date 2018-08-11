export default class PosDetector {
    /**
     * PosDetector constructor.
     *
     * @param {Array<PosDetectorRule>} rules
     */
    constructor(rules) {
        this._rules = rules;
        this.recognize = this.recognize.bind(this);
    }

    /**
     * Recognize the part of speech of the word.
     *
     * @param {string} word
     * @param {Gender} gender
     * @return {string|null} - Recognized part of speech or null if no applicable rule was found.
     */
    recognize(word, gender) {
        const rule = this._rules.find((rule) => rule.isApplicable(word, gender));
        if (!rule) {
            return null;
        }
        return rule.recognize(word, gender);
    }
}
