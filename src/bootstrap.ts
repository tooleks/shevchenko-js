import {
  AnthroponymInflector,
  FamilyNameInflector,
  GivenNameInflector,
  PatronymicNameInflector,
} from './anthroponym-declension';
import { ModelBundleLoader, WordClassRecognizer } from './word-class-recognition';
import { DeclensionRule, declensionRules } from './word-declension';

const wordClassRecognizer = new WordClassRecognizer(new ModelBundleLoader());
const givenNameInflector = new GivenNameInflector(declensionRules as DeclensionRule[]);
const patronymicNameInflector = new PatronymicNameInflector(declensionRules as DeclensionRule[]);
const familyNameInflector = new FamilyNameInflector(
  declensionRules as DeclensionRule[],
  wordClassRecognizer,
);
const anthroponymInflector = new AnthroponymInflector(
  givenNameInflector,
  patronymicNameInflector,
  familyNameInflector,
);

export { anthroponymInflector };
