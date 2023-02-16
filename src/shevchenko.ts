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
export async function inNominative(params: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.NOMINATIVE);
}

/**
 * Inflects the anthroponym in genitive grammatical case.
 */
export async function inGenitive(params: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.GENITIVE);
}

/**
 * Inflects the anthroponym in dative grammatical case.
 */
export async function inDative(params: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.DATIVE);
}

/**
 * Inflects the anthroponym in accusative grammatical case.
 */
export async function inAccusative(params: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.ACCUSATIVE);
}

/**
 * Inflects the anthroponym in ablative grammatical case.
 */
export async function inAblative(params: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.ABLATIVE);
}

/**
 * Inflects the anthroponym in locative grammatical case.
 */
export async function inLocative(params: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.LOCATIVE);
}

/**
 * Inflects the anthroponym in vocative grammatical case.
 */
export async function inVocative(params: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.VOCATIVE);
}
