import { Anthroponym } from './anthroponym-declension';
import { anthroponymInflector } from './bootstrap';
import { Gender, GrammaticalCase } from './language';
import { validateAnthroponym } from './validation';

export { Gender, GrammaticalCase } from './language';
export { Anthroponym } from './anthroponym-declension';
export { detectGender } from './gender-detection';

export type InflectAnthroponymParams = Anthroponym & {
  gender: Gender;
};

/**
 * Inflects the anthroponym in nominative grammatical case.
 */
export async function inNominative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.Nominative);
}

/**
 * Inflects the anthroponym in genitive grammatical case.
 */
export async function inGenitive(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.Genitive);
}

/**
 * Inflects the anthroponym in dative grammatical case.
 */
export async function inDative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.Dative);
}

/**
 * Inflects the anthroponym in accusative grammatical case.
 */
export async function inAccusative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.Accusative);
}

/**
 * Inflects the anthroponym in ablative grammatical case.
 */
export async function inAblative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.Ablative);
}

/**
 * Inflects the anthroponym in locative grammatical case.
 */
export async function inLocative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.Locative);
}

/**
 * Inflects the anthroponym in vocative grammatical case.
 */
export async function inVocative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.Vocative);
}
