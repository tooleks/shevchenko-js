export default class Recognizer {
  /**
   * @param {Array<RecognizerRule>} rules
   */
  constructor(rules) {
    this.rules = rules;
  }

  /**
   * Recognizes the part of speech of the word.
   *
   * @param {string} word
   * @param {GENDER} gender
   * @returns {string|null} - Recognized part of speech or null if no applicable rule was found.
   */
  recognize(word, gender) {
    const rule = this.rules.find((rule) => rule.applicable(word, gender));
    if (rule == null) {
      return null;
    }
    return rule.recognize(word, gender);
  }
}
