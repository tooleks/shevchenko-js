import * as RegExpUtils from '../Utils/RegExpUtils';
import * as StringUtils from '../Utils/StringUtils';
import GrammaticalCase from '../Core/GrammaticalCase';
import InflectorRule from './InflectorRule';
import CommandRunnerFactory from './CommandRunnerFactory';

export default class RuleInflector {
  private readonly rule: InflectorRule;
  private readonly commandRunnerFactory: CommandRunnerFactory;

  constructor(rule: InflectorRule) {
    this.rule = rule;
    this.commandRunnerFactory = new CommandRunnerFactory();
  }

  /**
   * Inflects a given word in a given grammatical case using the rule.
   */
  inflect(word: string, grammaticalCase: GrammaticalCase): string {
    const [commands] = this.rule.grammaticalCases[grammaticalCase];
    if (commands != null) {
      const searchValue = new RegExp(this.rule.pattern.modify, 'gi');
      const inflectedWord = word.replace(searchValue, (match, ...groups) => {
        let replacer = '';
        const maxIndex = RegExpUtils.countGroups(this.rule.pattern.modify);
        for (let index = 0; index < maxIndex; index += 1) {
          let value = groups[index];
          // @ts-ignore
          const command = commands[index];
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
