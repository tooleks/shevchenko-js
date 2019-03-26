import * as ruleUtil from './ruleUtil';

export default class MiddleNameInflector {
  /**
   * @param {RuleInflector} ruleInflector
   * @param {Array} rules
   */
  constructor(ruleInflector, rules) {
    this._ruleInflector = ruleInflector;
    this._rules = rules;
    this.inflect = this.inflect.bind(this);
  }

  /**
   * Inflect a middle name.
   *
   * @param {MiddleName} middleName
   * @param {Gender} gender
   * @param {InflectionCase} inflectionCaseName
   * @returns {MiddleName}
   */
  inflect(middleName, gender, inflectionCaseName) {
    return middleName.map((namePart) => {
      // Get the most suitable inflection rule.
      const [rule] = this._rules
        .filter(
          (rule) =>
            ruleUtil.matchGender(rule, gender) &&
            ruleUtil.matchUsage(rule, 'middleName', true) &&
            ruleUtil.matchRegExp(rule, namePart),
        )
        .sort((firstRule, secondRule) => ruleUtil.compareUsage(firstRule, secondRule, 'middleName'));

      if (rule == null) {
        return namePart;
      }

      return this._ruleInflector.inflect(namePart, inflectionCaseName, rule);
    });
  }
}
