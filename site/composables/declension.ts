import { createSharedComposable } from '@vueuse/core';
import { reactive } from 'vue';
import {
  Anthroponym,
  Gender,
  inNominative,
  inGenitive,
  inDative,
  inAccusative,
  inAblative,
  inLocative,
  inVocative,
} from 'shevchenko';
import maleFirstNames from '~/data/male-first-names.json';
import femaleFirstNames from '~/data/female-first-names.json';

export type GenderlessAnthroponym = Omit<Anthroponym, 'gender'>;

export const shevchenkoAnthroponym: Anthroponym = {
  gender: Gender.Male,
  lastName: 'Шевченко',
  firstName: 'Тарас',
  middleName: 'Григорович',
};

export interface DeclensionResults {
  nominativeCase: Anthroponym;
  genitiveCase: Anthroponym;
  dativeCase: Anthroponym;
  accusativeCase: Anthroponym;
  ablativeCase: Anthroponym;
  locativeCase: Anthroponym;
  vocativeCase: Anthroponym;
}

/**
 * Returns true if the given anthroponym is correctly defined.
 * Returns false otherwise.
 */
export function isDefinedAnthroponym(
  anthroponym: Partial<Anthroponym>,
): anthroponym is Anthroponym {
  return Boolean(
    anthroponym.gender &&
    Object.values(Gender).includes(anthroponym.gender) &&
    (anthroponym.firstName || anthroponym.middleName || anthroponym.lastName),
  );
}

export function isShevchenkoAnthroponym(anthroponym: Partial<Anthroponym>): boolean {
  return (
    anthroponym.gender === shevchenkoAnthroponym.gender &&
    anthroponym.lastName === shevchenkoAnthroponym.lastName &&
    anthroponym.firstName === shevchenkoAnthroponym.firstName &&
    anthroponym.middleName === shevchenkoAnthroponym.middleName
  );
}

export const useDeclension = createSharedComposable((predefinedAnthroponym: Anthroponym) => {
  let anthroponym: Anthroponym = reactive({
    gender: Gender.Male,
    lastName: '',
    firstName: '',
    middleName: '',
  });

  let initialAnthroponym: Anthroponym = reactive(shevchenkoAnthroponym);
  if (isDefinedAnthroponym(predefinedAnthroponym)) {
    initialAnthroponym = reactive(predefinedAnthroponym);
    anthroponym = reactive(predefinedAnthroponym);
  }

  const declensionResults: DeclensionResults = reactive({
    nominativeCase: inNominative(initialAnthroponym),
    genitiveCase: inGenitive(initialAnthroponym),
    dativeCase: inDative(initialAnthroponym),
    accusativeCase: inAccusative(initialAnthroponym),
    ablativeCase: inAblative(initialAnthroponym),
    locativeCase: inLocative(initialAnthroponym),
    vocativeCase: inVocative(initialAnthroponym),
  });

  function setAnthroponym(source: Anthroponym): void {
    anthroponym.gender = source.gender;
    anthroponym.lastName = source.lastName;
    anthroponym.firstName = source.firstName;
    anthroponym.middleName = source.middleName;
  }

  function inflect(source: Anthroponym): void {
    setAnthroponym(source);
    declensionResults.nominativeCase = inNominative(anthroponym);
    declensionResults.genitiveCase = inGenitive(anthroponym);
    declensionResults.dativeCase = inDative(anthroponym);
    declensionResults.accusativeCase = inAccusative(anthroponym);
    declensionResults.ablativeCase = inAblative(anthroponym);
    declensionResults.locativeCase = inLocative(anthroponym);
    declensionResults.vocativeCase = inVocative(anthroponym);
  }

  function detectGender(anthroponym: GenderlessAnthroponym): Gender | null {
    if (anthroponym.middleName) {
      const middleName = anthroponym.middleName.replace(/[`"]/g, "'").toLocaleLowerCase();
      if (/(и|і)ч$/.test(middleName)) {
        return Gender.Male;
      } else if (/на$/.test(middleName)) {
        return Gender.Female;
      }
    }

    if (anthroponym.firstName) {
      const firstName = anthroponym.firstName.replace(/[`"]/g, "'").toLocaleLowerCase();
      if (maleFirstNames.includes(firstName)) {
        return Gender.Male;
      } else if (femaleFirstNames.includes(firstName)) {
        return Gender.Female;
      }
    }

    return null;
  }

  return { anthroponym, declensionResults, inflect, detectGender };
});
