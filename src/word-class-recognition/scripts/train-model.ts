import { createReadStream } from 'fs';
import { join as joinPath } from 'path';
import * as tf from '@tensorflow/tfjs-node';
import { parse as createCsvParser } from 'csv';
import { ALPHABET_SIZE, WordClass } from '../../language';
import { SplitData, splitData } from '../data.utils';
import { MODEL_INPUT_SIZE } from '../model.config';
import { WordClassModelSaver } from '../word-class-model.saver';
import { WordClassTransformer } from '../word-class.transformer';
import { WordTransformer } from '../word.transformer';

const TRAINING_DATASET_FILEPATH = joinPath(__dirname, '../datasets/training.csv');
const MODEL_ARTIFACTS_SOURCE = 'file://' + joinPath(__dirname, '../artifacts');

export interface DataItem {
  word: string;
  wordClass: WordClass;
  wordEnding: string;
}

async function loadData(): Promise<SplitData<DataItem>> {
  const data: DataItem[] = [];
  const dataParser = createCsvParser({ columns: true });
  createReadStream(TRAINING_DATASET_FILEPATH).pipe(dataParser);

  for await (const dataRow of dataParser) {
    data.push({
      word: dataRow['Word'],
      wordClass: dataRow['Word Class'] as WordClass,
      wordEnding: dataRow['Word'].slice(-4),
    });
  }

  return splitData(data, ['wordClass', 'wordEnding'], 0.8);
}

const wordTransformer = new WordTransformer(MODEL_INPUT_SIZE);
const wordClassTransformer = new WordClassTransformer();
function transformDataEntry(dataItem: DataItem) {
  return {
    xs: wordTransformer.encode(dataItem.word),
    ys: wordClassTransformer.encode(dataItem.wordClass),
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
  await Promise.all([model.save(MODEL_ARTIFACTS_SOURCE), model.save(new WordClassModelSaver())]);
}

async function main(): Promise<void> {
  const splitData = await loadData();
  const model = await trainModel(splitData);
  await saveModel(model);
}

void main();
