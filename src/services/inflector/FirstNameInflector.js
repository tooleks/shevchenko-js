import * as ruleUtil from "./ruleUtil";

export default class FirstNameInflector {
    /**
     * FirstNameInflector constructor.
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
     * Inflect a first name.
     *
     * @param {FirstName} firstName
     * @param {Gender} gender
     * @param {InflectionCase} inflectionCaseName
     * @return {FirstName}
     */
    inflect(firstName, gender, inflectionCaseName) {
        return firstName.mapCompoundParts((namePart) => {
            // Get the most suitable inflection rule.
            const rule = this._rules
                .filter(
                    (rule) =>
                        ruleUtil.matchGender(rule, gender) &&
                        ruleUtil.matchUsage(rule, "firstName") &&
                        ruleUtil.matchRegExp(rule, namePart),
                )
                .sort((firstRule, secondRule) => ruleUtil.usageSorter(firstRule, secondRule, "firstName"))
                .shift();

            // If no inflection rule found, return name "as is".
            if (!rule) {
                return namePart;
            }

            // Otherwise, inflect name by the inflection rule.
            return this._ruleInflector.inflect(namePart, inflectionCaseName, rule);
        });
    }
}
