import { Anthroponym } from '../anthroponym-declension';
import { GrammaticalGender } from '../language';
import givenNameRules from './artifacts/given-name-rules.json';
import patronymicNameRules from './artifacts/patronymic-name-rules.json';
import { GrammaticalGenderDetector } from './grammatical-gender-detector';

const givenNameDetector = new GrammaticalGenderDetector({
  masculinePattern: new RegExp(givenNameRules.masculine, 'i'),
  femininePattern: new RegExp(givenNameRules.feminine, 'i'),
});

const patronymicNameDetector = new GrammaticalGenderDetector({
  masculinePattern: new RegExp(patronymicNameRules.masculine, 'i'),
  femininePattern: new RegExp(patronymicNameRules.feminine, 'i'),
});

/**
 * Detects the grammatical gender of the anthroponym using
 * patronymic name or given name endings.
 *
 * Returns the grammatical gender of the anthroponym.
 * Returns null if the grammatical gender of the anthroponym cannot be detected.
 */
export function detectGender(anthroponym: Anthroponym): GrammaticalGender | null {
  if (anthroponym.patronymicName) {
    return patronymicNameDetector.detect(anthroponym.patronymicName.toLocaleLowerCase());
  }

  if (anthroponym.givenName) {
    return givenNameDetector.detect(anthroponym.givenName.toLocaleLowerCase());
  }

  return null;
}
