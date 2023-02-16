import {
  AnthroponymInflector,
  FirstNameInflector,
  LastNameInflector,
  MiddleNameInflector,
} from './anthroponym-inflection';
import { ModelBundleLoader, WordClassRecognizer } from './word-class-recognition';
import { InflectorRule, inflectorRules } from './word-inflection';

const wordClassRecognizer = new WordClassRecognizer(new ModelBundleLoader());

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
