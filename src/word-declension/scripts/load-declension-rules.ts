import { writeFile } from 'fs/promises';
import { join as joinPath } from 'path';
import axios from 'axios';

const DECLENSION_RULES_URL =
  'https://raw.githubusercontent.com/tooleks/shevchenko-rules/main/dist/declension-rules.json';
const DECLENSION_RULES_FILEPATH = joinPath(__dirname, '../declension-rules.json');

async function main(): Promise<void> {
  const response = await axios.get(DECLENSION_RULES_URL);
  await writeFile(DECLENSION_RULES_FILEPATH, JSON.stringify(response.data, null, 2), 'utf-8');
}

void main();
