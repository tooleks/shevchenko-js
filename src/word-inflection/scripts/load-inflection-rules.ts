import { writeFile } from 'fs/promises';
import { join as joinPath } from 'path';
import axios from 'axios';

const INFLECTION_RULES_URL =
  'https://raw.githubusercontent.com/tooleks/shevchenko-rules/master/dist/rules.json';
const INFLECTION_RULES_FILEPATH = joinPath(__dirname, '../artifacts/inflection-rules.json');

async function main(): Promise<void> {
  const response = await axios.get(INFLECTION_RULES_URL);
  await writeFile(INFLECTION_RULES_FILEPATH, JSON.stringify(response.data, null, 2), 'utf-8');
}

void main();
