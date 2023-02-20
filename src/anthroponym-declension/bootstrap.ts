import { wordInflector } from '../word-declension/bootstrap';
import { AnthroponymInflector } from './anthroponym-inflector';
import { FamilyNameClassifier, ModelBundleLoader } from './family-name-classifier';
import { FamilyNameInflector } from './family-name-inflector';
import { GivenNameInflector } from './given-name-inflector';
import { PatronymicNameInflector } from './patronymic-name-inflector';

const givenNameInflector = new GivenNameInflector(wordInflector);
const patronymicNameInflector = new PatronymicNameInflector(wordInflector);
const familyNameClassifier = new FamilyNameClassifier(new ModelBundleLoader());
const familyNameInflector = new FamilyNameInflector(wordInflector, familyNameClassifier);

export const anthroponymInflector = new AnthroponymInflector(
  givenNameInflector,
  patronymicNameInflector,
  familyNameInflector,
);
