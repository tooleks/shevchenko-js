import * as ruleUtil from "./ruleUtil";

export default class LastNameInflector {
  /**
   * @param {RuleInflector} ruleInflector
   * @param {Array} rules
   * @param {Recognizer} posRecognizer
   */
  constructor(ruleInflector, rules, posRecognizer) {
    this.ruleInflector = ruleInflector;
    this.rules = rules;
    this.posRecognizer = posRecognizer;
  }

  /**
   * Inflects a last name.
   *
   * @param {string} lastName
   * @param {GENDER} gender
   * @param {INFLECTION_CASE} inflectionCaseName
   * @returns {string}
   */
  inflect(lastName, gender, inflectionCaseName) {
    const segments = lastName.split("-");
    return segments
      .map((segment, index) => {
        const isLastSegment = index === segments.length - 1;
        const vowels = segment.match(/(а|о|у|е|и|і|я|ю|є|ї)/gim);
        const hasOneVowel = vowels && vowels.length === 1;
        if (!isLastSegment && hasOneVowel) {
          return segment;
        }

        const [rule] = this.rules
          .filter(
            (rule) =>
              ruleUtil.matchGender(rule, gender) &&
              ruleUtil.matchUsage(rule, "lastName") &&
              ruleUtil.matchRegExp(rule, segment) &&
              ruleUtil.matchPos(rule, this.posRecognizer.recognize(segment.toLowerCase(), gender)),
          )
          .sort((firstRule, secondRule) => ruleUtil.compareUsage(firstRule, secondRule, "lastName"));

        if (rule == null) {
          return segment;
        }

        return this.ruleInflector.inflect(segment, inflectionCaseName, rule);
      })
      .join("-");
  }
}
