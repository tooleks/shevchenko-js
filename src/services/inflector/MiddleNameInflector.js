import * as ruleUtil from "./ruleUtil";

export default class MiddleNameInflector {
  /**
   * @param {RuleInflector} ruleInflector
   * @param {Array} rules
   */
  constructor(ruleInflector, rules) {
    this.ruleInflector = ruleInflector;
    this.rules = rules;
  }

  /**
   * Inflects a middle name.
   *
   * @param {string} middleName
   * @param {GENDER} gender
   * @param {INFLECTION_CASE} inflectionCaseName
   * @returns {string}
   */
  inflect(middleName, gender, inflectionCaseName) {
    return middleName
      .split("-")
      .map((segment) => {
        const [rule] = this.rules
          .filter(
            (rule) =>
              ruleUtil.matchGender(rule, gender) &&
              ruleUtil.matchUsage(rule, "middleName", true) &&
              ruleUtil.matchRegExp(rule, segment),
          )
          .sort((firstRule, secondRule) => ruleUtil.compareUsage(firstRule, secondRule, "middleName"));

        if (rule == null) {
          return segment;
        }

        return this.ruleInflector.inflect(segment, inflectionCaseName, rule);
      })
      .join("-");
  }
}
