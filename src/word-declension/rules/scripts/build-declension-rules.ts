import * as fs from 'node:fs';
import * as path from 'node:path';

const MACRO = {
  '\\[голосний\\]': '(а|е|є|и|і|ї|о|у|ю|я)',
  '\\[приголосний\\]': '(б|в|г|ґ|д|дз|дж|ж|з|й|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)',
  '\\[твердий_приголосний\\]': '(б|в|г|ґ|д|дз|дж|ж|з|к|л|м|н|п|р|с|т|ф|х|ц|ч|ш|щ)',
  '\\[губний_приголосний\\]': '(б|п|в|м|ф)',
} as const;
type MacroName = keyof typeof MACRO;

function replaceMacro(text: string): string {
  let result = text;
  const macroNames = Object.keys(MACRO) as MacroName[];
  for (const macroName of macroNames) {
    const searchPattern = new RegExp(macroName, 'g');
    result = result.replace(searchPattern, MACRO[macroName]);
  }
  return result;
}

const ruleFiles = [
  'adjective-declension-rules.json',
  'exception-declension-rules.json',
  'noun-declension-rules.json',
];

const rules = [];

for (const ruleFile of ruleFiles) {
  const fileName = path.join(__dirname, '..', ruleFile);
  const fileContents = fs.readFileSync(fileName, 'utf-8');
  const transformedFileContents = replaceMacro(fileContents);
  rules.push(...JSON.parse(transformedFileContents));
}

rules.sort((firstRule, lastRule) => lastRule.priority - firstRule.priority);

const fileName = path.join(__dirname, '../artifacts/declension-rules.json');
fs.writeFileSync(fileName, JSON.stringify(rules, null, 2), 'utf-8');
