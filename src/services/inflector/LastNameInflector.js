import * as ruleUtil from './ruleUtil';

export default class LastNameInflector {
  /**
   * @param {RuleInflector} ruleInflector
   * @param {Array} rules
   * @param {Recognizer} posRecognizer
   */
  constructor(ruleInflector, rules, posRecognizer) {
    this._ruleInflector = ruleInflector;
    this._rules = rules;
    this._posRecognizer = posRecognizer;
    this.inflect = this.inflect.bind(this);
  }

  /**
   * Inflect a last name.
   *
   * @param {LastName} lastName
   * @param {Gender} gender
   * @param {InflectionCase} inflectionCaseName
   * @returns {LastName}
   */
  inflect(lastName, gender, inflectionCaseName) {
    return lastName.map((namePart, index, length) => {
      // If the first (on practice, not the last) short part of the compound last name has only one vowel,
      // it is not perceived as an independent surname and returned "as is".
      const isLastSegment = index === length - 1;
      const vowels = namePart.match(/(а|о|у|е|и|і|я|ю|є|ї)/gim);
      const hasOneVowel = vowels && vowels.length === 1;
      if (!isLastSegment && hasOneVowel) {
        return namePart;
      }

      // Get the most suitable inflection rule.
      const [rule] = this._rules
        .filter(
          (rule) =>
            ruleUtil.matchGender(rule, gender) &&
            ruleUtil.matchUsage(rule, 'lastName') &&
            ruleUtil.matchRegExp(rule, namePart) &&
            ruleUtil.matchPos(rule, this._posRecognizer.recognize(namePart, gender)),
        )
        .sort((firstRule, secondRule) => ruleUtil.compareUsage(firstRule, secondRule, 'lastName'));

      if (rule == null) {
        return namePart;
      }

      return this._ruleInflector.inflect(namePart, inflectionCaseName, rule);
    });
  }
}
