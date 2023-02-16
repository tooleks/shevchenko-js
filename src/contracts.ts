import { Anthroponym } from './anthroponym-declension';
import { GrammaticalGender } from './language';

export type DeclensionInput = Anthroponym & {
  gender: GrammaticalGender;
};

export type DeclensionOutput = Anthroponym;
