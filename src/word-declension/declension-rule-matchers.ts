import { GrammaticalGender } from '../language';
import { DeclensionRule } from './declension-types';

/**
 * Determines if a given declension rule applies to a specified gender.
 */
export function isGenderApplicable(rule: DeclensionRule, gender: GrammaticalGender): boolean {
  return rule.gender.includes(gender);
}

/**
 * Determines if a given declension rule applies to a specified application type.
 */
export function isApplicable(rule: DeclensionRule, applicationType: string): boolean {
  return rule.applicationType.length === 0 || rule.applicationType.includes(applicationType);
}

/**
 * Determines if a given declension rule strictly applies to a specified application type.
 */
export function isStriclyApplicable(rule: DeclensionRule, applicationType: string): boolean {
  return rule.applicationType.includes(applicationType);
}

/**
 * Determines if a given declension rule applies to a specified word.
 */
export function isWordApplicable(rule: DeclensionRule, word: string): boolean {
  return new RegExp(rule.pattern.find, 'gi').test(word);
}
