import { anthroponymInflector } from './bootstrap';
import { DeclensionInput, DeclensionOutput } from './contracts';
import { GrammaticalCase } from './language';
import { validateDeclensionInput } from './validation';

export { DeclensionInput, DeclensionOutput } from './contracts';
export { GrammaticalGender, GrammaticalCase } from './language';
export { Anthroponym } from './anthroponym-declension';
export { detectGender } from './gender-detection';

/**
 * Inflects the anthroponym in nominative grammatical case.
 */
export async function inNominative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.NOMINATIVE);
}

/**
 * Inflects the anthroponym in genitive grammatical case.
 */
export async function inGenitive(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.GENITIVE);
}

/**
 * Inflects the anthroponym in dative grammatical case.
 */
export async function inDative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.DATIVE);
}

/**
 * Inflects the anthroponym in accusative grammatical case.
 */
export async function inAccusative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.ACCUSATIVE);
}

/**
 * Inflects the anthroponym in ablative grammatical case.
 */
export async function inAblative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.ABLATIVE);
}

/**
 * Inflects the anthroponym in locative grammatical case.
 */
export async function inLocative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.LOCATIVE);
}

/**
 * Inflects the anthroponym in vocative grammatical case.
 */
export async function inVocative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.VOCATIVE);
}
