import {
  AnthroponymInflector,
  FirstNameInflector,
  LastNameInflector,
  MiddleNameInflector,
} from './anthroponym-declension';
import { ModelBundleLoader, WordClassRecognizer } from './word-class-recognition';
import { DeclensionRule, declensionRules } from './word-declension';

const wordClassRecognizer = new WordClassRecognizer(new ModelBundleLoader());

const firstNameInflector = new FirstNameInflector(declensionRules as DeclensionRule[]);
const middleNameInflector = new MiddleNameInflector(declensionRules as DeclensionRule[]);
const lastNameInflector = new LastNameInflector(
  declensionRules as DeclensionRule[],
  wordClassRecognizer,
);
const anthroponymInflector = new AnthroponymInflector(
  firstNameInflector,
  middleNameInflector,
  lastNameInflector,
);

export { anthroponymInflector };
