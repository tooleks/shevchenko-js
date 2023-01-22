import {
  AnthroponymInflector,
  FirstNameInflector,
  InflectorRule,
  LastNameInflector,
  MiddleNameInflector,
} from './anthroponym-inflection';
import { Gender } from './core';
import {
  NeuralNetwork,
  NeuralNetworkTrainingData,
  PartOfSpeechRecognitionRule,
  PartOfSpeechRecognizer,
} from './part-of-speech-recognition';
import inflectorRules from './resources/inflector/rules.json';
import kosmiiCache from './resources/neural-networks/kosmii/cache.json';
import kosmiiStructure from './resources/neural-networks/kosmii/structure.json';
import pelykhCache from './resources/neural-networks/pelykh/cache.json';
import pelykhStructure from './resources/neural-networks/pelykh/structure.json';
import pohorielovaCache from './resources/neural-networks/pohorielova/cache.json';
import pohorielovaStructure from './resources/neural-networks/pohorielova/structure.json';

const partOfSpeechRecognizer = new PartOfSpeechRecognizer([
  new PartOfSpeechRecognitionRule(
    (word: string, gender: Gender) => gender === Gender.Female && /[ая]$/i.test(word),
    NeuralNetwork.fromJSON(pohorielovaStructure),
    pohorielovaCache as NeuralNetworkTrainingData,
  ),
  new PartOfSpeechRecognitionRule(
    (word: string, gender: Gender) => gender === Gender.Male && /(ой|ий|ій)$/i.test(word),
    NeuralNetwork.fromJSON(kosmiiStructure),
    kosmiiCache as NeuralNetworkTrainingData,
  ),
  new PartOfSpeechRecognitionRule(
    (word: string, gender: Gender) => gender === Gender.Male && /(их)$/i.test(word),
    NeuralNetwork.fromJSON(pelykhStructure),
    pelykhCache as NeuralNetworkTrainingData,
  ),
]);

const firstNameInflector = new FirstNameInflector(inflectorRules as InflectorRule[]);
const middleNameInflector = new MiddleNameInflector(inflectorRules as InflectorRule[]);
const lastNameInflector = new LastNameInflector(
  inflectorRules as InflectorRule[],
  partOfSpeechRecognizer,
);
const anthroponymInflector = new AnthroponymInflector(
  firstNameInflector,
  middleNameInflector,
  lastNameInflector,
);

export { anthroponymInflector };
