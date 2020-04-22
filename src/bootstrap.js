import Gender from './Core/Gender';
import FirstNameInflector from './AnthroponymInflector/FirstNameInflector';
import MiddleNameInflector from './AnthroponymInflector/MiddleNameInflector';
import LastNameInflector from './AnthroponymInflector/LastNameInflector';
import AnthroponymInflector from './AnthroponymInflector/AnthroponymInflector';
import PartOfSpeechRecognizer from './PartOfSpeechRecognizer/PartOfSpeechRecognizer';
import NeuralNetwork from './PartOfSpeechRecognizer/NeuralNetwork';
import RecognizerRule from './PartOfSpeechRecognizer/RecognizerRule';
// tslint:disable-next-line import-name
import inflectorRules from './Resources/Inflector/rules.json';
// tslint:disable-next-line import-name
import pohorielovaStructure from './Resources/NeuralNetworks/Pohorielova/structure.json';
// tslint:disable-next-line import-name
import pohorielovaCache from './Resources/NeuralNetworks/Pohorielova/cache.json';
// tslint:disable-next-line import-name
import kosmiiStructure from './Resources/NeuralNetworks/Kosmii/structure.json';
// tslint:disable-next-line import-name
import kosmiiCache from './Resources/NeuralNetworks/Kosmii/cache.json';
// tslint:disable-next-line import-name
import pelykhStructure from './Resources/NeuralNetworks/Pelykh/structure.json';
// tslint:disable-next-line import-name
import pelykhCache from './Resources/NeuralNetworks/Pelykh/cache.json';
const partOfSpeechRecognizer = new PartOfSpeechRecognizer([
    new RecognizerRule((word, gender) => gender === Gender.Female && /[ая]$/i.test(word), NeuralNetwork.fromJSON(pohorielovaStructure), pohorielovaCache),
    new RecognizerRule((word, gender) => gender === Gender.Male && /(ой|ий|ій)$/i.test(word), NeuralNetwork.fromJSON(kosmiiStructure), kosmiiCache),
    new RecognizerRule((word, gender) => gender === Gender.Male && /(их)$/i.test(word), NeuralNetwork.fromJSON(pelykhStructure), pelykhCache),
]);
const firstNameInflector = new FirstNameInflector(inflectorRules);
const middleNameInflector = new MiddleNameInflector(inflectorRules);
const lastNameInflector = new LastNameInflector(inflectorRules, partOfSpeechRecognizer);
const anthroponymInflector = new AnthroponymInflector(firstNameInflector, middleNameInflector, lastNameInflector);
export { anthroponymInflector };
//# sourceMappingURL=bootstrap.js.map