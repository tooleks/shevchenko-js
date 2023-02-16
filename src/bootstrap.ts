import {
  AnthroponymInflector,
  FirstNameInflector,
  LastNameInflector,
  MiddleNameInflector,
} from './anthroponym-inflection';
import { WordClassModelLoader, WordClassRecognizer } from './word-class-recognition';
import { InflectorRule } from './word-inflection';
import inflectorRules from './word-inflection/artifacts/inflection-rules.json';

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
