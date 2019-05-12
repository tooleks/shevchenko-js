import * as ruleUtil from "./ruleUtil";

export default class FirstNameInflector {
  /**
   * @param {RuleInflector} ruleInflector
   * @param {Array} rules
   */
  constructor(ruleInflector, rules) {
    this.ruleInflector = ruleInflector;
    this.rules = rules;
  }

  /**
   * Inflects a first name.
   *
   * @param {string} firstName
   * @param {GENDER} gender
   * @param {INFLECTION_CASE} inflectionCaseName
   * @returns {string}
   */
  inflect(firstName, gender, inflectionCaseName) {
    return firstName
      .split("-")
      .map((segment) => {
        const [rule] = this.rules
          .filter(
            (rule) =>
              ruleUtil.matchGender(rule, gender) &&
              ruleUtil.matchUsage(rule, "firstName") &&
              ruleUtil.matchRegExp(rule, segment),
          )
          .sort((firstRule, secondRule) => ruleUtil.compareUsage(firstRule, secondRule, "firstName"));

        if (rule == null) {
          return segment;
        }

        return this.ruleInflector.inflect(segment, inflectionCaseName, rule);
      })
      .join("-");
  }
}
