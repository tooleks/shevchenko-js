import { anthroponymInflector } from './anthroponym-declension/bootstrap';
import {
  DeclensionInput,
  DeclensionOutput,
  GenderDetectionInput,
  GenderDetectionOutput,
} from './contracts';
import { detectGender as autoDetectGender } from './gender-detection';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  InputValidationError,
  validateDeclensionInput,
  validateGenderDetectionInput,
} from './input-validation';
import { GrammaticalCase } from './language';

export * from './contracts';
export { InputValidationError } from './input-validation';
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
 * @throws {InputValidationError} Input validation error.
 */
export async function inNominative<T extends DeclensionInput>(
  input: T,
): Promise<DeclensionOutput<T>> {
  validateDeclensionInput(input);
  const result = await anthroponymInflector.inflect(
    input,
    input.gender,
    GrammaticalCase.NOMINATIVE,
  );
  return result as DeclensionOutput<T>;
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
 * @throws {InputValidationError} Input validation error.
 */
export async function inGenitive<T extends DeclensionInput>(
  input: T,
): Promise<DeclensionOutput<T>> {
  validateDeclensionInput(input);
  const result = await anthroponymInflector.inflect(input, input.gender, GrammaticalCase.GENITIVE);
  return result as DeclensionOutput<T>;
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
 * @throws {InputValidationError} Input validation error.
 */
export async function inDative<T extends DeclensionInput>(input: T): Promise<DeclensionOutput<T>> {
  validateDeclensionInput(input);
  const result = await anthroponymInflector.inflect(input, input.gender, GrammaticalCase.DATIVE);
  return result as DeclensionOutput<T>;
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
 * @throws {InputValidationError} Input validation error.
 */
export async function inAccusative<T extends DeclensionInput>(
  input: T,
): Promise<DeclensionOutput<T>> {
  validateDeclensionInput(input);
  const result = await anthroponymInflector.inflect(
    input,
    input.gender,
    GrammaticalCase.ACCUSATIVE,
  );
  return result as DeclensionOutput<T>;
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
 * @throws {InputValidationError} Input validation error.
 */
export async function inAblative<T extends DeclensionInput>(
  input: T,
): Promise<DeclensionOutput<T>> {
  validateDeclensionInput(input);
  const result = await anthroponymInflector.inflect(input, input.gender, GrammaticalCase.ABLATIVE);
  return result as DeclensionOutput<T>;
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
 * @throws {InputValidationError} Input validation error.
 */
export async function inLocative<T extends DeclensionInput>(
  input: T,
): Promise<DeclensionOutput<T>> {
  validateDeclensionInput(input);
  const result = await anthroponymInflector.inflect(input, input.gender, GrammaticalCase.LOCATIVE);
  return result as DeclensionOutput<T>;
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
 * @throws {InputValidationError} Input validation error.
 */
export async function inVocative<T extends DeclensionInput>(
  input: T,
): Promise<DeclensionOutput<T>> {
  validateDeclensionInput(input);
  const result = await anthroponymInflector.inflect(input, input.gender, GrammaticalCase.VOCATIVE);
  return result as DeclensionOutput<T>;
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
 * @throws {InputValidationError} Input validation error.
 */
export async function detectGender(input: GenderDetectionInput): Promise<GenderDetectionOutput> {
  validateGenderDetectionInput(input);
  return autoDetectGender(input);
}
