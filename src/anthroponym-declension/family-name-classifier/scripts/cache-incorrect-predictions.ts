import { createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join as joinPath } from 'node:path';
import * as tf from '@tensorflow/tfjs-node';
import { parse as createCsvParser } from 'csv';
import { FamilyNameClassTransformer } from '../family-name-class-transformer';
import { ModelBundleLoader } from '../model-bundle-loader';
import { MODEL_INPUT_SIZE } from '../model-config';
import { WordTransformer } from '../word-transformer';

const TRAINING_DATASET_FILEPATH = joinPath(__dirname, '../datasets/training.csv');
const INCORRECT_PREDICTIONS_FILEPATH = joinPath(__dirname, '../cache/incorrect-predictions.json');

type IncorrectPredictions = Record<string, string>;

async function retrieveIncorrectPredictions(): Promise<IncorrectPredictions> {
  const dataParser = createCsvParser({ columns: true });
  createReadStream(TRAINING_DATASET_FILEPATH).pipe(dataParser);

  const model = await tf.loadLayersModel(new ModelBundleLoader());
  const wordTransformer = new WordTransformer(MODEL_INPUT_SIZE);
  const familyNameClassTransformer = new FamilyNameClassTransformer();

  const incorrectPredictions: IncorrectPredictions = {};
  for await (const dataRow of dataParser) {
    const input = wordTransformer.encode(dataRow['Family Name']);
    const output = await (model.predict(tf.tensor2d([input])) as tf.Tensor).data();
    const familyNameClass = familyNameClassTransformer.decode(output);
    if (familyNameClass.wordClass !== dataRow['Word Class']) {
      incorrectPredictions[dataRow['Family Name']] = dataRow['Word Class'];
    }
  }

  return incorrectPredictions;
}

async function saveIncorrectPredictions(cache: IncorrectPredictions): Promise<void> {
  await writeFile(INCORRECT_PREDICTIONS_FILEPATH, JSON.stringify(cache, null, 2), 'utf-8');
}

async function main(): Promise<void> {
  const incorrectPredictions = await retrieveIncorrectPredictions();
  await saveIncorrectPredictions(incorrectPredictions);
}

void main();
