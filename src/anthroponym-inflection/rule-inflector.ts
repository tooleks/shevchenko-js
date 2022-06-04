import { countGroups } from '../utils/regexp.utils';
import { copyLetterCase } from '../utils/string.utils';
import { GrammaticalCase } from '../core';
import { InflectorRule } from './inflector.types';
import { CommandRunnerFactory } from './command-runner-factory';

export class RuleInflector {
  private readonly rule: InflectorRule;
  private readonly commandRunnerFactory: CommandRunnerFactory;

  constructor(rule: InflectorRule) {
    this.rule = rule;
    this.commandRunnerFactory = new CommandRunnerFactory();
  }

  /**
   * Inflects the given word in the given grammatical case using the rule.
   */
  inflect(word: string, grammaticalCase: GrammaticalCase): string {
    const [commands] = this.rule.grammaticalCases[grammaticalCase];
    if (commands) {
      const searchValue = new RegExp(this.rule.pattern.modify, 'gi');
      const inflectedWord = word.replace(searchValue, (match, ...groups) => {
        let replacer = '';
        const groupCount = countGroups(this.rule.pattern.modify);
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
      return copyLetterCase(word, inflectedWord);
    }
    return word;
  }
}
