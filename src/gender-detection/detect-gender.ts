import { Anthroponym, Gender } from '../core';
import givenNamesGenders from './given-names-genders.json';

const MASCULINE_PATRONYMIC_PATTERN = /(и|і)ч$/;
const FEMININE_PATRONYMIC_PATTERN = /на$/;
const APOSTROPHE_VARIATION_PATTERN = /[`"]/g;

type KnownGivenName = keyof typeof givenNamesGenders;
export type GenderlessAnthroponym = Omit<Anthroponym, 'gender'>;

/**
 * Detects the grammatical gender of the anthroponym using
 * patronymic name endings and the dictionary of known given names.
 *
 * Returns the grammatical gender of the anthroponym.
 * Returns null if the grammatical gender of the anthroponym cannot be detected.
 */
export function detectGender(anthroponym: GenderlessAnthroponym): Gender | null {
  if (anthroponym.middleName) {
    const patronymicName = anthroponym.middleName
      .replace(APOSTROPHE_VARIATION_PATTERN, "'")
      .toLocaleLowerCase();

    if (MASCULINE_PATRONYMIC_PATTERN.test(patronymicName)) {
      return Gender.Male;
    } else if (FEMININE_PATRONYMIC_PATTERN.test(patronymicName)) {
      return Gender.Female;
    }
  }

  if (anthroponym.firstName) {
    const givenName = anthroponym.firstName
      .replace(APOSTROPHE_VARIATION_PATTERN, "'")
      .toLocaleLowerCase() as KnownGivenName;

    const gender = givenNamesGenders[givenName];
    if (gender != null) {
      return gender as Gender;
    }
  }

  return null;
}
