import GrammaticalCase from '../Core/GrammaticalCase';
import InflectorRule from './InflectorRule';
export default class RuleInflector {
    private readonly rule;
    private readonly commandRunnerFactory;
    constructor(rule: InflectorRule);
    /**
     * Inflects a given word in a given grammatical case using the rule.
     */
    inflect(word: string, grammaticalCase: GrammaticalCase): string;
}
