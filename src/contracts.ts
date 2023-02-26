import { Anthroponym } from './anthroponym-declension';
import { GrammaticalGender } from './language';

/**
 * The input parameters for anthroponym declension.
 */
export type DeclensionInput = Anthroponym & { gender: GrammaticalGender };

/**
 * The output result of anthroponym declension.
 */
export type DeclensionOutput = Anthroponym;

/**
 * The input parameters for gender detection.
 */
export type GenderDetectionInput = Anthroponym;

/**
 * The output result of gender detection.
 */
export type GenderDetectionOutput = GrammaticalGender | null;
