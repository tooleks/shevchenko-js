import { GrammaticalGender } from '../language';
import { DeclensionRule } from './declension-types';

/**
 * Determines if a given declension rule applies to a specified gender.
 */
export function isGenderApplicable(rule: DeclensionRule, gender: GrammaticalGender): boolean {
  return rule.gender.includes(gender);
}

/**
 * Determines if a given declension rule applies to a specified application.
 */
export function isApplicable(rule: DeclensionRule, application: string): boolean {
  return rule.application.length === 0 || rule.application.includes(application);
}

/**
 * Determines if a given declension rule strictly applies to a specified application.
 */
export function isStriclyApplicable(rule: DeclensionRule, application: string): boolean {
  return rule.application.includes(application);
}

/**
 * Determines if a given declension rule applies to a specified word.
 */
export function isWordApplicable(rule: DeclensionRule, word: string): boolean {
  return new RegExp(rule.pattern.find, 'gi').test(word);
}
