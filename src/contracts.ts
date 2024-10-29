import { GrammaticalGender } from './language';

/**
 * The input parameters for anthroponym declension.
 *
 * @example
 * ```ts
 * {
 *   gender: shevchenko.GrammaticalGender.MASCULINE,
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * }
 * ```
 */
export interface DeclensionInput {
  gender: GrammaticalGender;
  givenName?: string;
  patronymicName?: string;
  familyName?: string;
}

/**
 * The output result of anthroponym declension.
 *
 * @example
 * ```ts
 * {
 *   givenName: 'Тарасе',
 *   patronymicName: 'Григоровичу',
 *   familyName: 'Шевченку',
 * }
 * ```
 */
export type DeclensionOutput<T extends DeclensionInput = DeclensionInput> = Omit<T, 'gender'>;

/**
 * The input parameters for gender detection.
 *
 * @example
 * ```ts
 * {
 *   givenName: 'Тарас',
 *   patronymicName: 'Григорович',
 *   familyName: 'Шевченко',
 * }
 * ```
 */
export interface GenderDetectionInput {
  givenName?: string;
  patronymicName?: string;
  familyName?: string;
}

/**
 * The output result of gender detection.
 *
 * @example
 * ```ts
 * {
 *   gender: 'masculine',
 * }
 * ```
 */
export type GenderDetectionOutput = GrammaticalGender | null;
