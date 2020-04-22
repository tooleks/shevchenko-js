import GrammaticalCase from './Core/GrammaticalCase';
import { anthroponymInflector } from './bootstrap';
/**
 * Inflects an anthroponym in nominative grammatical case.
 */
export function inNominative(anthroponym) {
    return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Nominative);
}
/**
 * Inflects an anthroponym in genitive grammatical case.
 */
export function inGenitive(anthroponym) {
    return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Genitive);
}
/**
 * Inflects an anthroponym in dative grammatical case.
 */
export function inDative(anthroponym) {
    return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Dative);
}
/**
 * Inflects an anthroponym in accusative grammatical case.
 */
export function inAccusative(anthroponym) {
    return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Accusative);
}
/**
 * Inflects an anthroponym in ablative grammatical case.
 */
export function inAblative(anthroponym) {
    return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Ablative);
}
/**
 * Inflects an anthroponym in locative grammatical case.
 */
export function inLocative(anthroponym) {
    return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Locative);
}
/**
 * Inflects an anthroponym in vocative grammatical case.
 */
export function inVocative(anthroponym) {
    return anthroponymInflector.inflect(anthroponym, GrammaticalCase.Vocative);
}
//# sourceMappingURL=shevchenko.js.map