'use strict';

const util = require('util');
const fs = require('fs');
const gulp = require('gulp');
const axios = require('axios');
const shevchenko = require('./dist/cjs/shevchenko');
const pohorielovaSamples = require('./src/resources/neural-networks/pohorielova/samples.json');
const pohorielovaStructure = require('./src/resources/neural-networks/pohorielova/structure.json');
const kosmiiSamples = require('./src/resources/neural-networks/kosmii/samples.json');
const kosmiiStructure = require('./src/resources/neural-networks/kosmii/structure.json');
const pelykhSamples = require('./src/resources/neural-networks/pelykh/samples.json');
const pelykhStructure = require('./src/resources/neural-networks/pelykh/structure.json');

const writeFileAsync = util.promisify(fs.writeFile);

gulp.task('update:inflector-rules', async () => {
  const response = await axios.get('https://raw.githubusercontent.com/tooleks/shevchenko-rules/master/dist/rules.json');
  await writeFileAsync('./src/resources/inflector/rules.json', JSON.stringify(response.data, null, 2));
});

gulp.task('train:pohorielova-network', async () => {
  const pohorielovaNetwork = shevchenko.Internal.NeuralNetwork.fromJSON(pohorielovaStructure);
  pohorielovaNetwork.train(pohorielovaSamples, {
    rate: 0.01,
    iterations: 1000,
    shuffle: true,
    error: 0.005,
    log: 1,
  });
  await writeFileAsync('./src/resources/neural-networks/pohorielova/structure.json', pohorielovaNetwork.toString());
});

gulp.task('train:kosmii-network', async () => {
  const kosmiiNetwork = shevchenko.Internal.NeuralNetwork.fromJSON(kosmiiStructure);
  kosmiiNetwork.train(kosmiiSamples, {
    rate: 0.01,
    iterations: 1000,
    shuffle: true,
    error: 0.001,
    log: 1,
  });
  await writeFileAsync('./src/resources/neural-networks/kosmii/structure.json', kosmiiNetwork.toString());
});

gulp.task('train:pelykh-network', async () => {
  const pelykhNetwork = shevchenko.Internal.NeuralNetwork.fromJSON(pelykhStructure);
  pelykhNetwork.train(pelykhSamples, {
    rate: 0.01,
    iterations: 1000,
    shuffle: true,
    error: 0.001,
    log: 1,
  });
  await writeFileAsync('./src/resources/neural-networks/pelykh/structure.json', pelykhNetwork.toString());
});

gulp.task('build:pohorielova-cache', async () => {
  const pohorielovaCache = {};
  const pohorielovaNetwork = shevchenko.Internal.NeuralNetwork.fromJSON(pohorielovaStructure);
  Object.entries(pohorielovaSamples).forEach(([word, partOfSpeech]) => {
    if (partOfSpeech !== pohorielovaNetwork.activate(word)) {
      pohorielovaCache[word] = partOfSpeech;
    }
  });
  await writeFileAsync('./src/resources/neural-networks/pohorielova/cache.json', JSON.stringify(pohorielovaCache, null, 2));
});

gulp.task('build:kosmii-cache', async () => {
  const kosmiiCache = {};
  const kosmiiNetwork = shevchenko.Internal.NeuralNetwork.fromJSON(kosmiiStructure);
  Object.entries(kosmiiSamples).forEach(([word, partOfSpeech]) => {
    if (partOfSpeech !== kosmiiNetwork.activate(word)) {
      kosmiiCache[word] = partOfSpeech;
    }
  });
  await writeFileAsync('./src/resources/neural-networks/kosmii/cache.json', JSON.stringify(kosmiiCache, null, 2));
});

gulp.task('build:pelykh-cache', async () => {
  const pelykhCache = {};
  const pelykhNetwork = shevchenko.Internal.NeuralNetwork.fromJSON(pelykhStructure);
  Object.entries(pelykhSamples).forEach(([word, partOfSpeech]) => {
    if (partOfSpeech !== pelykhNetwork.activate(word)) {
      pelykhCache[word] = partOfSpeech;
    }
  });
  await writeFileAsync('./src/resources/neural-networks/pelykh/cache.json', JSON.stringify(pelykhCache, null, 2));
});

gulp.task('build:network-cache', gulp.series('build:pohorielova-cache', 'build:kosmii-cache', 'build:pelykh-cache'));
