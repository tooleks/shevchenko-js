import { GrammaticalGender } from './language';

/**
 * The input parameters for anthroponym declension.
 */
export type DeclensionInput = {
  gender: GrammaticalGender;
  givenName?: string;
  patronymicName?: string;
  familyName?: string;
};

/**
 * The output result of anthroponym declension.
 */
export type DeclensionOutput<T extends DeclensionInput = DeclensionInput> = Omit<T, 'gender'>;

/**
 * The input parameters for gender detection.
 */
export type GenderDetectionInput = {
  givenName?: string;
  patronymicName?: string;
  familyName?: string;
};

/**
 * The output result of gender detection.
 */
export type GenderDetectionOutput = GrammaticalGender | null;
