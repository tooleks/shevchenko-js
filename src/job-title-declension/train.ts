import * as path from 'path';
import * as tf from '@tensorflow/tfjs-node';
import { Alphabet, Letter } from './alphabet';

const INPUT_SIZE = 30;
const INPUT_FILLER = 0;

const TRAINING_DATASET_SOURCE = 'file://' + path.join(__dirname, 'datasets/training.csv');
const VALIDATION_DATASET_SOURCE = 'file://' + path.join(__dirname, 'datasets/validation.csv');

export interface DataRow {
  word: string;
  inNominative: number;
}

function loadDataset(source: string): tf.data.Dataset<tf.TensorContainer> {
  return tf.data
    .csv(source, {
      hasHeader: true,
      columnNames: ['word', 'inNominative'],
    })
    .map((value) => {
      const data = value as unknown as DataRow;
      return { xs: wordToVector(data.word), ys: [data.inNominative] };
    })
    .batch(100);
}

export function wordToVector(word: string): number[] {
  const vector: number[] = [];

  // Encode each letter in the word with the corresponding code from the alphabet.
  for (const letter of word) {
    const code = Alphabet[letter as Letter] ?? INPUT_FILLER;
    vector.push(code);
  }

  while (vector.length > INPUT_SIZE) {
    vector.shift();
  }

  while (vector.length < INPUT_SIZE) {
    vector.unshift(INPUT_FILLER);
  }

  return vector;
}

async function main(): Promise<void> {
  const model = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [INPUT_SIZE], units: INPUT_SIZE }),
      tf.layers.dense({ units: 2, activation: 'sigmoid' }),
    ],
  });

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'sparseCategoricalCrossentropy',
    metrics: ['accuracy'],
  });

  model.summary();

  const trainingDataset = loadDataset(TRAINING_DATASET_SOURCE);
  const validationDataset = loadDataset(VALIDATION_DATASET_SOURCE);

  await model.fitDataset(trainingDataset, {
    epochs: 100,
    validationData: validationDataset,
  });
}

void main();
