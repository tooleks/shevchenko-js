import { Anthroponym, Gender } from '../core';
import givenNamesGendersJson from './given-names-genders.json';

type KnownGivenName = keyof typeof givenNamesGendersJson;

const MASCULINE_PATRONYMIC_PATTERN = /(и|і)ч$/;
const FEMININE_PATRONYMIC_PATTERN = /на$/;

/**
 * Detects the grammatical gender of the anthroponym using
 * patronymic name endings and the dictionary of known given names.
 *
 * Returns the grammatical gender of the anthroponym.
 * Returns null if the grammatical gender of the anthroponym cannot be detected.
 */
export function detectGender(anthroponym: Anthroponym): Gender | null {
  if (anthroponym.middleName) {
    const patronymicName = anthroponym.middleName.replace(/[`"]/g, "'").toLocaleLowerCase();
    if (MASCULINE_PATRONYMIC_PATTERN.test(patronymicName)) {
      return Gender.Male;
    } if (FEMININE_PATRONYMIC_PATTERN.test(patronymicName)) {
      return Gender.Female;
    }
  }

  if (anthroponym.firstName) {
    const givenName = anthroponym.firstName.replace(/[`"]/g, "'").toLocaleLowerCase() as KnownGivenName;
    const gender = givenNamesGendersJson[givenName];
    if (gender != null) {
      return gender as Gender;
    }
  }

  return null;
}
