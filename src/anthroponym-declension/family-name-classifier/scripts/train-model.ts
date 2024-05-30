import * as fs from 'node:fs';
import * as path from 'node:path';
import * as tf from '@tensorflow/tfjs-node';
import { parse as createCsvParser } from 'csv';
import { ALPHABET_SIZE, WordClass } from '../../../language';
import { SplitData, splitData } from '../data-utils';
import { FamilyNameClass } from '../family-name-class';
import { FamilyNameClassTransformer } from '../family-name-class-transformer';
import { ModelBundleSaver } from '../model-bundle-saver';
import { MODEL_INPUT_SIZE } from '../model-config';
import { WordTransformer } from '../word-transformer';

const TRAINING_DATASET_FILEPATH = path.join(__dirname, '../datasets/training.csv');
const MODEL_ARTIFACTS_SOURCE = 'file://' + path.join(__dirname, '../artifacts');

export type DataItem = FamilyNameClass & {
  familyName: string;
  wordEnding: string;
};

async function loadData(): Promise<SplitData<DataItem>> {
  const data: DataItem[] = [];
  const dataParser = createCsvParser({ columns: true });
  fs.createReadStream(TRAINING_DATASET_FILEPATH).pipe(dataParser);

  for await (const dataRow of dataParser) {
    data.push({
      familyName: dataRow['Family Name'],
      wordClass: dataRow['Word Class'] as WordClass,
      wordEnding: dataRow['Family Name'].slice(-2),
    });
  }

  return splitData(data, ['wordClass', 'wordEnding'], 0.8);
}

const wordTransformer = new WordTransformer(MODEL_INPUT_SIZE);
const familyNameClassTransformer = new FamilyNameClassTransformer();
function transformDataEntry(dataItem: DataItem) {
  return {
    xs: wordTransformer.encode(dataItem.familyName),
    ys: familyNameClassTransformer.encode({ wordClass: dataItem.wordClass }),
  };
}

async function trainModel({
  trainingData,
  validationData,
}: SplitData<DataItem>): Promise<tf.LayersModel> {
  const model = tf.sequential({
    layers: [
      tf.layers.embedding({ inputDim: ALPHABET_SIZE + 1, outputDim: 16 }),
      tf.layers.simpleRNN({ units: 16, activation: 'relu' }),
      tf.layers.dense({ units: 1, activation: 'sigmoid' }),
    ],
  });

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  model.summary();

  const trainingDataset = tf.data
    .array(trainingData.map(transformDataEntry))
    .shuffle(5_000)
    .batch(500);

  const validationDataset = tf.data
    .array(validationData.map(transformDataEntry))
    .shuffle(5_000)
    .batch(500);

  await model.fitDataset(trainingDataset, {
    epochs: 100,
    validationData: validationDataset,
    callbacks: tf.callbacks.earlyStopping({ patience: 3 }),
  });

  return model;
}

async function saveModel(model: tf.LayersModel): Promise<void> {
  await Promise.all([model.save(MODEL_ARTIFACTS_SOURCE), model.save(new ModelBundleSaver())]);
}

async function main(): Promise<void> {
  const splitData = await loadData();
  const model = await trainModel(splitData);
  await saveModel(model);
}

void main();
