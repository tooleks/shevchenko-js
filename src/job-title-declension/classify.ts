import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { uniq } from 'lodash';
import { DataRow } from './train';

const sourceJson = fs.readFileSync(path.join(__dirname, 'datasets/raw.json'), 'utf-8');
const source = JSON.parse(sourceJson) as string[];

const dataJson = fs.readFileSync(path.join(__dirname, 'datasets/classified.json'), 'utf-8');
const dataset = JSON.parse(dataJson) as DataRow[];

const words = uniq(
  source
    .flatMap((line) => line.split(/\s/))
    .filter((word) => word.length > 2)
    .map((word) => word.toLowerCase())
    .filter((word) => !dataset.find((dataRow) => dataRow.word === word)),
);

async function main(): Promise<void> {
  for (const word of words) {
    const result = await userInput(`"${word}" is in nominative? `);
    dataset.push({ word: word, inNominative: Number(result) });
    console.log(`${dataset.length}/${words.length}`);

    fs.writeFileSync(
      path.join(__dirname, 'datasets/classified.json'),
      JSON.stringify(dataset, null, 2),
      'utf-8',
    );
  }
}

void main();

async function userInput(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}
