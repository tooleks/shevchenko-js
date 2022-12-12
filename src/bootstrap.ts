import {
  AnthroponymInflector,
  FirstNameInflector,
  InflectorRule,
  LastNameInflector,
  MiddleNameInflector,
} from './anthroponym-inflection';
import inflectorRules from './resources/inflector/rules.json';
import { WordClassModelLoader, WordClassRecognizer } from './word-class-recognition';

const wordClassModelLoader = new WordClassModelLoader();
const wordClassRecognizer = new WordClassRecognizer(wordClassModelLoader);

const firstNameInflector = new FirstNameInflector(inflectorRules as InflectorRule[]);
const middleNameInflector = new MiddleNameInflector(inflectorRules as InflectorRule[]);
const lastNameInflector = new LastNameInflector(
  inflectorRules as InflectorRule[],
  wordClassRecognizer,
);
const anthroponymInflector = new AnthroponymInflector(
  firstNameInflector,
  middleNameInflector,
  lastNameInflector,
);

export { anthroponymInflector };
