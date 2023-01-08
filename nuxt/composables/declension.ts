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

  function inflect(): void {
    declensionResults.nominativeCase = inNominative(anthroponym);
    declensionResults.genitiveCase = inGenitive(anthroponym);
    declensionResults.dativeCase = inDative(anthroponym);
    declensionResults.accusativeCase = inAccusative(anthroponym);
    declensionResults.ablativeCase = inAblative(anthroponym);
    declensionResults.locativeCase = inLocative(anthroponym);
    declensionResults.vocativeCase = inVocative(anthroponym);
  }

  return { anthroponym, declensionResults, inflect };
});
