import { GrammaticalCase } from '../language';
import { CommandRunnerFactory } from './command-runner-factory';
import { DeclensionRule } from './declension.types';
import { copyLetterCase } from './word.utils';

/**
 * Counts a number of groups in a given regular expression.
 */
export function countGroups(src: RegExp | string): number {
  const pattern = new RegExp(`${src.toString()}|`);
  const matches = pattern.exec('');
  if (matches == null) {
    return 0;
  }
  return matches.length - 1;
}

export class DeclensionRuleInflector {
  private readonly rule: DeclensionRule;
  private readonly commandRunnerFactory: CommandRunnerFactory;

  constructor(rule: DeclensionRule) {
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
