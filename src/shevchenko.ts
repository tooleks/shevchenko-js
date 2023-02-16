import { anthroponymInflector } from './bootstrap';
import { Anthroponym, validateAnthroponym } from './core';
import { GrammaticalCase } from './language';

export { Gender, GrammaticalCase } from './language';
export { Anthroponym } from './core';
export { detectGender, GenderlessAnthroponym } from './gender-detection';

/**
 * Inflects the anthroponym in nominative grammatical case.
 */
export async function inNominative(anthroponym: Anthroponym): Promise<Anthroponym> {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Nominative);
}

/**
 * Inflects the anthroponym in genitive grammatical case.
 */
export async function inGenitive(anthroponym: Anthroponym): Promise<Anthroponym> {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Genitive);
}

/**
 * Inflects the anthroponym in dative grammatical case.
 */
export async function inDative(anthroponym: Anthroponym): Promise<Anthroponym> {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Dative);
}

/**
 * Inflects the anthroponym in accusative grammatical case.
 */
export async function inAccusative(anthroponym: Anthroponym): Promise<Anthroponym> {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Accusative);
}

/**
 * Inflects the anthroponym in ablative grammatical case.
 */
export async function inAblative(anthroponym: Anthroponym): Promise<Anthroponym> {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Ablative);
}

/**
 * Inflects the anthroponym in locative grammatical case.
 */
export async function inLocative(anthroponym: Anthroponym): Promise<Anthroponym> {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Locative);
}

/**
 * Inflects the anthroponym in vocative grammatical case.
 */
export async function inVocative(anthroponym: Anthroponym): Promise<Anthroponym> {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Vocative);
}
