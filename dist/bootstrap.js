"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gender_1 = __importDefault(require("./Core/Gender"));
const FirstNameInflector_1 = __importDefault(require("./AnthroponymInflector/FirstNameInflector"));
const MiddleNameInflector_1 = __importDefault(require("./AnthroponymInflector/MiddleNameInflector"));
const LastNameInflector_1 = __importDefault(require("./AnthroponymInflector/LastNameInflector"));
const AnthroponymInflector_1 = __importDefault(require("./AnthroponymInflector/AnthroponymInflector"));
const PartOfSpeechRecognizer_1 = __importDefault(require("./PartOfSpeechRecognizer/PartOfSpeechRecognizer"));
const NeuralNetwork_1 = __importDefault(require("./PartOfSpeechRecognizer/NeuralNetwork"));
const RecognizerRule_1 = __importDefault(require("./PartOfSpeechRecognizer/RecognizerRule"));
const rules_json_1 = __importDefault(require("./Resources/Inflector/rules.json"));
const structure_json_1 = __importDefault(require("./Resources/NeuralNetworks/Pohorielova/structure.json"));
const cache_json_1 = __importDefault(require("./Resources/NeuralNetworks/Pohorielova/cache.json"));
const structure_json_2 = __importDefault(require("./Resources/NeuralNetworks/Kosmii/structure.json"));
const cache_json_2 = __importDefault(require("./Resources/NeuralNetworks/Kosmii/cache.json"));
const structure_json_3 = __importDefault(require("./Resources/NeuralNetworks/Pelykh/structure.json"));
const cache_json_3 = __importDefault(require("./Resources/NeuralNetworks/Pelykh/cache.json"));
const partOfSpeechRecognizer = new PartOfSpeechRecognizer_1.default([
    new RecognizerRule_1.default((word, gender) => gender === Gender_1.default.Female && /[ая]$/i.test(word), NeuralNetwork_1.default.fromJSON(structure_json_1.default), cache_json_1.default),
    new RecognizerRule_1.default((word, gender) => gender === Gender_1.default.Male && /(ой|ий|ій)$/i.test(word), NeuralNetwork_1.default.fromJSON(structure_json_2.default), cache_json_2.default),
    new RecognizerRule_1.default((word, gender) => gender === Gender_1.default.Male && /(их)$/i.test(word), NeuralNetwork_1.default.fromJSON(structure_json_3.default), cache_json_3.default),
]);
const firstNameInflector = new FirstNameInflector_1.default(rules_json_1.default);
const middleNameInflector = new MiddleNameInflector_1.default(rules_json_1.default);
const lastNameInflector = new LastNameInflector_1.default(rules_json_1.default, partOfSpeechRecognizer);
const anthroponymInflector = new AnthroponymInflector_1.default(firstNameInflector, middleNameInflector, lastNameInflector);
exports.anthroponymInflector = anthroponymInflector;
//# sourceMappingURL=bootstrap.js.map