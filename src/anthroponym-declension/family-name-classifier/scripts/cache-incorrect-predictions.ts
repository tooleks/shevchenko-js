import { createReadStream } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { parse as createCsvParser } from 'csv';
import { FamilyNameClassTransformer } from '../family-name-class-transformer';
import { ModelBundleLoader } from '../model-bundle-loader';
import { MODEL_INPUT_SIZE } from '../model-config';
import { WordTransformer } from '../word-transformer';
import * as tf from './tfjs-node-compat';

const TRAINING_DATASET_FILEPATH = path.join(__dirname, '../datasets/training.csv');
const INCORRECT_PREDICTIONS_FILEPATH = path.join(__dirname, '../cache/incorrect-predictions.json');
const PROGRESS_LOG_INTERVAL = 1000;

type IncorrectPredictions = Record<string, string>;

async function retrieveIncorrectPredictions(): Promise<IncorrectPredictions> {
  const dataParser = createCsvParser({ columns: true });
  createReadStream(TRAINING_DATASET_FILEPATH).pipe(dataParser);

  const model = await tf.loadLayersModel(new ModelBundleLoader());
  const wordTransformer = new WordTransformer(MODEL_INPUT_SIZE);
  const familyNameClassTransformer = new FamilyNameClassTransformer();

  const startedAt = Date.now();
  const logProgress = (processedCount: number): void => {
    const incorrectCount = Object.keys(incorrectPredictions).length;
    const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
    console.log(
      `Processed ${processedCount} rows, ${incorrectCount} incorrect predictions (${elapsedSeconds}s)`,
    );
  };

  const incorrectPredictions: IncorrectPredictions = {};
  let processedCount = 0;
  for await (const dataRow of dataParser) {
    const input = wordTransformer.encode(dataRow['Family Name']);
    // Run the prediction in tf.tidy() so the input and output tensors are disposed after reading the
    // output. Otherwise each row leaks native tensor memory on the tensorflow backend.
    const output = tf.tidy(() => (model.predict(tf.tensor2d([input])) as tf.Tensor).dataSync());
    const familyNameClass = familyNameClassTransformer.decode(output);
    if (familyNameClass.wordClass !== dataRow['Word Class']) {
      incorrectPredictions[dataRow['Family Name']] = dataRow['Word Class'];
    }
    processedCount++;
    if (processedCount % PROGRESS_LOG_INTERVAL === 0) {
      logProgress(processedCount);
    }
  }
  logProgress(processedCount);

  return incorrectPredictions;
}

async function saveIncorrectPredictions(cache: IncorrectPredictions): Promise<void> {
  await fs.writeFile(INCORRECT_PREDICTIONS_FILEPATH, JSON.stringify(cache, null, 2), 'utf-8');
}

async function main(): Promise<void> {
  const incorrectPredictions = await retrieveIncorrectPredictions();
  await saveIncorrectPredictions(incorrectPredictions);
  console.log(`Saved incorrect predictions to ${INCORRECT_PREDICTIONS_FILEPATH}`);
}

void main();
