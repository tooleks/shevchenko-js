import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { uniq } from 'lodash';
import { DataRow } from './train';

const sourceJson = fs.readFileSync(path.join(__dirname, 'datasets/raw.json'), 'utf-8');
const source = JSON.parse(sourceJson) as string[];

const dataJson = fs.readFileSync(path.join(__dirname, 'datasets/classified.json'), 'utf-8');
const dataset = JSON.parse(dataJson) as DataRow[];

for (const dataRow of dataset) {
  console.log(`${dataRow.word},${dataRow.inNominative}`);
}
