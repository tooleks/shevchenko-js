import { Anthroponym } from '../anthroponym-declension';
import { GrammaticalGender } from '../language';
import givenNamesGenders from './given-names-genders.json';

const MASCULINE_PATRONYMIC_PATTERN = /[иі]ч$/;
const FEMININE_PATRONYMIC_PATTERN = /на$/;
const APOSTROPHE_VARIATION_PATTERN = /[`"]/g;

type GivenName = keyof typeof givenNamesGenders;

/**
 * Detects the grammatical gender of the anthroponym using
 * patronymic name endings and the dictionary of known given names.
 *
 * Returns the grammatical gender of the anthroponym.
 * Returns null if the grammatical gender of the anthroponym cannot be detected.
 */
export function detectGender(anthroponym: Anthroponym): GrammaticalGender | null {
  if (anthroponym.patronymicName) {
    const patronymicName = anthroponym.patronymicName.toLocaleLowerCase();

    if (MASCULINE_PATRONYMIC_PATTERN.test(patronymicName)) {
      return GrammaticalGender.MASCULINE;
    } else if (FEMININE_PATRONYMIC_PATTERN.test(patronymicName)) {
      return GrammaticalGender.FEMININE;
    }
  }

  if (anthroponym.givenName) {
    const givenName = anthroponym.givenName
      .replace(APOSTROPHE_VARIATION_PATTERN, "'")
      .toLocaleLowerCase() as GivenName;

    const gender = givenNamesGenders[givenName];
    if (gender != null) {
      return gender as GrammaticalGender;
    }
  }

  return null;
}
