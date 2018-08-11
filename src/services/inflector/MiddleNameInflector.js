import * as ruleUtil from "./ruleUtil";

export default class MiddleNameInflector {
    /**
     * MiddleNameInflector constructor.
     *
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
     * @return {MiddleName}
     */
    inflect(middleName, gender, inflectionCaseName) {
        return middleName.mapCompoundParts((namePart) => {
            // Get the most suitable inflection rule.
            const [rule] = this._rules
                .filter(
                    (rule) =>
                        ruleUtil.matchGender(rule, gender) &&
                        ruleUtil.matchUsage(rule, "middleName", true) &&
                        ruleUtil.matchRegExp(rule, namePart),
                )
                .sort((firstRule, secondRule) => ruleUtil.compareUsage(firstRule, secondRule, "middleName"));

            // If no inflection rule found, return name "as is".
            if (!rule) {
                return namePart;
            }

            // Otherwise, inflect name by the inflection rule.
            return this._ruleInflector.inflect(namePart, inflectionCaseName, rule);
        });
    }
}
