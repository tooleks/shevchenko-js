import * as fs from 'node:fs';
import * as path from 'node:path';
import { APOSTROPHE_PATTERN } from '../../../language';

const RULES_FILE = path.join(__dirname, '../artifacts/declension-rules.json');

const MACRO = new Map([
  [/\[апостроф\]/g, APOSTROPHE_PATTERN.source],
  [/\[голосний\]/g, '[аеєиіїоуюя]'],
  [/\[приголосний\]/g, '([бвгґджзйклмнпрстфхцчшщ]|дз|дж)'],
  [/\[твердий_приголосний\]/g, '([бвгґджзклмнпрстфхцчшщ]|дз|дж)'],
  [/\[губний_приголосний\]/g, '[бпвмф]'],
]);

function replaceMacro(text: string): string {
  let result = text;
  for (const [macro, value] of MACRO.entries()) {
    result = result.replace(macro, value);
  }
  return result;
}

const ruleFiles = [
  '../adjective-declension-rules.json',
  '../exception-declension-rules.json',
  '../noun-declension-rules.json',
  '../numeral-declension-rules.json',
];

const rules = [];

for (const ruleFile of ruleFiles) {
  const fileName = path.join(__dirname, ruleFile);
  const fileContents = fs.readFileSync(fileName, 'utf-8');
  const transformedFileContents = replaceMacro(fileContents);
  rules.push(...JSON.parse(transformedFileContents));
}

rules.sort((firstRule, lastRule) => lastRule.priority - firstRule.priority);

fs.writeFileSync(RULES_FILE, JSON.stringify(rules, null, 2), 'utf-8');
