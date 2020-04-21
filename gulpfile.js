'use strict';

const util = require('util');
const fs = require('fs');
const gulp = require('gulp');
const axios = require('axios');
const shevchenko = require('./dist-ts/main');
const pohorielovaSamples = require('./src-ts/Resources/NeuralNetworks/Pohorielova/samples.json');
const pohorielovaStructure = require('./src-ts/Resources/NeuralNetworks/Pohorielova/structure.json');
const kosmiiSamples = require('./src-ts/Resources/NeuralNetworks/Kosmii/samples.json');
const kosmiiStructure = require('./src-ts/Resources/NeuralNetworks/Kosmii/structure.json');
const pelykhSamples = require('./src-ts/Resources/NeuralNetworks/Pelykh/samples.json');
const pelykhStructure = require('./src-ts/Resources/NeuralNetworks/Pelykh/structure.json');

const writeFileAsync = util.promisify(fs.writeFile);

gulp.task('update:inflector-rules', async () => {
  const response = await axios.get('https://raw.githubusercontent.com/tooleks/shevchenko-rules/refactoring/dist/rules.json');
  await writeFileAsync('./src-ts/Resources/Inflector/rules.json', JSON.stringify(response.data, null, 2));
});

gulp.task('build:pohorielova-cache', async () => {
  const pohorielovaCache = {};
  const pohorielovaNetwork = shevchenko.NeuralNetwork.fromJSON(pohorielovaStructure);
  Object.entries(pohorielovaSamples).forEach(([word, partOfSpeech]) => {
    if (partOfSpeech !== pohorielovaNetwork.activate(word)) {
      pohorielovaCache[word] = partOfSpeech;
    }
  });
  await writeFileAsync('./src-ts/Resources/NeuralNetworks/Pohorielova/cache.json', JSON.stringify(pohorielovaCache, null, 2));
});

gulp.task('build:kosmii-cache', async () => {
  const kosmiiCache = {};
  const kosmiiNetwork = shevchenko.NeuralNetwork.fromJSON(kosmiiStructure);
  Object.entries(kosmiiSamples).forEach(([word, partOfSpeech]) => {
    if (partOfSpeech !== kosmiiNetwork.activate(word)) {
      kosmiiCache[word] = partOfSpeech;
    }
  });
  await writeFileAsync('./src-ts/Resources/NeuralNetworks/Kosmii/cache.json', JSON.stringify(kosmiiCache, null, 2));
});

gulp.task('build:pelykh-cache', async () => {
  const pelykhCache = {};
  const pelykhNetwork = shevchenko.NeuralNetwork.fromJSON(pelykhStructure);
  Object.entries(pelykhSamples).forEach(([word, partOfSpeech]) => {
    if (partOfSpeech !== pelykhNetwork.activate(word)) {
      pelykhCache[word] = partOfSpeech;
    }
  });
  await writeFileAsync('./src-ts/Resources/NeuralNetworks/Pelykh/cache.json', JSON.stringify(pelykhCache, null, 2));
});

gulp.task('build:network-cache', gulp.series('build:pohorielova-cache', 'build:kosmii-cache', 'build:pelykh-cache'));
