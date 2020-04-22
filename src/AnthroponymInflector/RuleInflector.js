import * as RegExpUtils from '../Utils/RegExpUtils';
import * as StringUtils from '../Utils/StringUtils';
import CommandRunnerFactory from './CommandRunnerFactory';
export default class RuleInflector {
    constructor(rule) {
        this.rule = rule;
        this.commandRunnerFactory = new CommandRunnerFactory();
    }
    /**
     * Inflects a given word in a given grammatical case using the rule.
     */
    inflect(word, grammaticalCase) {
        const [commands] = this.rule.grammaticalCases[grammaticalCase];
        if (commands) {
            const searchValue = new RegExp(this.rule.pattern.modify, 'gi');
            const inflectedWord = word.replace(searchValue, (match, ...groups) => {
                let replacer = '';
                const groupCount = RegExpUtils.countGroups(this.rule.pattern.modify);
                for (let groupIndex = 0; groupIndex < groupCount; groupIndex += 1) {
                    let value = groups[groupIndex];
                    const command = commands[groupIndex];
                    if (command != null) {
                        value = this.commandRunnerFactory.make(command).exec(value);
                    }
                    replacer += value;
                }
                return replacer;
            });
            return StringUtils.copyLetterCase(word, inflectedWord);
        }
        return word;
    }
}
//# sourceMappingURL=RuleInflector.js.map