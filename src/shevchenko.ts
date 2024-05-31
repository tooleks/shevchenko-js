import { anthroponymInflector } from './anthroponym-declension/bootstrap';
import {
  DeclensionInput,
  DeclensionOutput,
  GenderDetectionInput,
  GenderDetectionOutput,
} from './contracts';
import { detectGender as autoDetectGender } from './gender-detection';
import { validateDeclensionInput, validateGenderDetectionInput } from './input-validation';
import { GrammaticalCase } from './language';

export * from './contracts';
export { GrammaticalGender, GrammaticalCase } from './language';
export { Anthroponym } from './anthroponym-declension';

/**
 * Inflects an anthroponym in nominative grammatical case.
 *
 * @example
 * ```ts
 * const anthroponym = await shevchenko.inNominative({
 *   gender: shevchenko.GrammaticalGender.MASCULINE,
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * });
 * ```
 * @throws {TypeError} Input validation error.
 */
export async function inNominative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.NOMINATIVE);
}

/**
 * Inflects an anthroponym in genitive grammatical case.
 *
 * @example
 * ```ts
 * const anthroponym = await shevchenko.inGenitive({
 *   gender: shevchenko.GrammaticalGender.MASCULINE,
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * });
 * ```
 * @throws {TypeError} Input validation error.
 */
export async function inGenitive(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.GENITIVE);
}

/**
 * Inflects an anthroponym in dative grammatical case.
 *
 * @example
 * ```ts
 * const anthroponym = await shevchenko.inDative({
 *   gender: shevchenko.GrammaticalGender.MASCULINE,
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * });
 * ```
 * @throws {TypeError} Input validation error.
 */
export async function inDative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.DATIVE);
}

/**
 * Inflects an anthroponym in accusative grammatical case.
 *
 * @example
 * ```ts
 * const anthroponym = await shevchenko.inAccusative({
 *   gender: shevchenko.GrammaticalGender.MASCULINE,
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * });
 * ```
 * @throws {TypeError} Input validation error.
 */
export async function inAccusative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.ACCUSATIVE);
}

/**
 * Inflects an anthroponym in ablative grammatical case.
 *
 * @example
 * ```ts
 * const anthroponym = await shevchenko.inAblative({
 *   gender: shevchenko.GrammaticalGender.MASCULINE,
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * });
 * ```
 * @throws {TypeError} Input validation error.
 */
export async function inAblative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.ABLATIVE);
}

/**
 * Inflects an anthroponym in locative grammatical case.
 *
 * @example
 * ```ts
 * const anthroponym = await shevchenko.inLocative({
 *   gender: shevchenko.GrammaticalGender.MASCULINE,
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * });
 * ```
 * @throws {TypeError} Input validation error.
 */
export async function inLocative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.LOCATIVE);
}

/**
 * Inflects an anthroponym in vocative grammatical case.
 *
 * @example
 * ```ts
 * const anthroponym = await shevchenko.inVocative({
 *   gender: shevchenko.GrammaticalGender.MASCULINE,
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * });
 * ```
 * @throws {TypeError} Input validation error.
 */
export async function inVocative(input: DeclensionInput): Promise<DeclensionOutput> {
  validateDeclensionInput(input);
  return anthroponymInflector.inflect(input, input.gender, GrammaticalCase.VOCATIVE);
}

/**
 * Returns the grammatical gender of an anthroponym.
 * Returns null if the grammatical gender cannot be detected.
 *
 * @example
 * ```ts
 * const gender = await shevchenko.detectGender({
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * });
 * ```
 * @throws {TypeError} Input validation error.
 */
export async function detectGender(input: GenderDetectionInput): Promise<GenderDetectionOutput> {
  validateGenderDetectionInput(input);
  return autoDetectGender(input);
}
