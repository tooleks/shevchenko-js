import { Anthroponym } from './anthroponym-declension';
import { GrammaticalGender } from './language';

/**
 * The input parameters for declension action.
 */
export type DeclensionInput = Anthroponym & { gender: GrammaticalGender };

/**
 * The result of declension action.
 */
export type DeclensionOutput = Anthroponym;
