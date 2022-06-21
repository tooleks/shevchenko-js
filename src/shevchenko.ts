import { Anthroponym, Gender, GrammaticalCase, validateAnthroponym } from './core';
import { anthroponymInflector } from './bootstrap';

/**
 * Inflects the anthroponym in nominative grammatical case.
 */
export function inNominative(anthroponym: Anthroponym): Anthroponym {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Nominative);
}

/**
 * Inflects the anthroponym in genitive grammatical case.
 */
export function inGenitive(anthroponym: Anthroponym): Anthroponym {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Genitive);
}

/**
 * Inflects the anthroponym in dative grammatical case.
 */
export function inDative(anthroponym: Anthroponym): Anthroponym {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Dative);
}

/**
 * Inflects the anthroponym in accusative grammatical case.
 */
export function inAccusative(anthroponym: Anthroponym): Anthroponym {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Accusative);
}

/**
 * Inflects the anthroponym in ablative grammatical case.
 */
export function inAblative(anthroponym: Anthroponym): Anthroponym {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Ablative);
}

/**
 * Inflects the anthroponym in locative grammatical case.
 */
export function inLocative(anthroponym: Anthroponym): Anthroponym {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Locative);
}

/**
 * Inflects the anthroponym in vocative grammatical case.
 */
export function inVocative(anthroponym: Anthroponym): Anthroponym {
  validateAnthroponym(anthroponym);
  return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Vocative);
}

export { Anthroponym, Gender };

// Not a part of public API.
export * as Internal from './internal';
