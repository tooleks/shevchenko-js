import { Anthroponym } from './anthroponym-declension';
import { anthroponymInflector } from './bootstrap';
import { GrammaticalCase, GrammaticalGender } from './language';
import { validateAnthroponym } from './validation';

export { GrammaticalGender as Gender, GrammaticalCase } from './language';
export { Anthroponym } from './anthroponym-declension';
export { detectGender } from './gender-detection';

export type InflectAnthroponymParams = Anthroponym & {
  gender: GrammaticalGender;
};

/**
 * Inflects the anthroponym in nominative grammatical case.
 */
export async function inNominative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.NOMINATIVE);
}

/**
 * Inflects the anthroponym in genitive grammatical case.
 */
export async function inGenitive(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.GENITIVE);
}

/**
 * Inflects the anthroponym in dative grammatical case.
 */
export async function inDative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.DATIVE);
}

/**
 * Inflects the anthroponym in accusative grammatical case.
 */
export async function inAccusative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.ACCUSATIVE);
}

/**
 * Inflects the anthroponym in ablative grammatical case.
 */
export async function inAblative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.ABLATIVE);
}

/**
 * Inflects the anthroponym in locative grammatical case.
 */
export async function inLocative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.LOCATIVE);
}

/**
 * Inflects the anthroponym in vocative grammatical case.
 */
export async function inVocative(params: InflectAnthroponymParams): Promise<Anthroponym> {
  validateAnthroponym(params);
  return anthroponymInflector.inflect(params, params.gender, GrammaticalCase.VOCATIVE);
}
