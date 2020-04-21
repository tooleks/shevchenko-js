import Gender from './Core/Gender';
import InflectorRule from './AnthroponymInflector/InflectorRule';
import FirstNameInflector from './AnthroponymInflector/FirstNameInflector';
import MiddleNameInflector from './AnthroponymInflector/MiddleNameInflector';
import LastNameInflector from './AnthroponymInflector/LastNameInflector';
import AnthroponymInflector from './AnthroponymInflector/AnthroponymInflector';
import PartOfSpeechRecognizer from './PartOfSpeechRecognizer/PartOfSpeechRecognizer';
import NeuralNetwork from './PartOfSpeechRecognizer/NeuralNetwork';
import RecognizerCache from './PartOfSpeechRecognizer/RecognizerCache';
import RecognizerRule from './PartOfSpeechRecognizer/RecognizerRule';
import InflectorRules from './Resources/Inflector/rules.json';
import pohorielovaStructure from './Resources/NeuralNetworks/Pohorielova/structure.json';
import pohorielovaCache from './Resources/NeuralNetworks/Pohorielova/cache.json';
import kosmiiStructure from './Resources/NeuralNetworks/Kosmii/structure.json';
import kosmiiCache from './Resources/NeuralNetworks/Kosmii/cache.json';
import pelykhStructure from './Resources/NeuralNetworks/Pelykh/structure.json';
import pelykhCache from './Resources/NeuralNetworks/Pelykh/cache.json';

const partOfSpeechRecognizer = new PartOfSpeechRecognizer([
  new RecognizerRule(
    (word: string, gender: Gender) => gender === Gender.Female && /[ая]$/i.test(word),
    NeuralNetwork.fromJSON(pohorielovaStructure),
    pohorielovaCache as RecognizerCache
  ),
  new RecognizerRule(
    (word: string, gender: Gender) => gender === Gender.Male && /(ой|ий|ій)$/i.test(word),
    NeuralNetwork.fromJSON(kosmiiStructure),
    kosmiiCache as RecognizerCache
  ),
  new RecognizerRule(
    (word: string, gender: Gender) => gender === Gender.Male && /(их)$/i.test(word),
    NeuralNetwork.fromJSON(pelykhStructure),
    pelykhCache as RecognizerCache
  ),
]);

const firstNameInflector = new FirstNameInflector(InflectorRules as InflectorRule[]);
const middleNameInflector = new MiddleNameInflector(InflectorRules as InflectorRule[]);
const lastNameInflector = new LastNameInflector(InflectorRules as InflectorRule[], partOfSpeechRecognizer);
const anthroponymInflector = new AnthroponymInflector(firstNameInflector, middleNameInflector, lastNameInflector);

export { anthroponymInflector };
