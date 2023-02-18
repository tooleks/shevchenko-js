import { createSharedComposable } from '@vueuse/core';
import { reactive } from 'vue';
import {
  GrammaticalGender,
  inNominative,
  inGenitive,
  inDative,
  inAccusative,
  inAblative,
  inLocative,
  inVocative,
  DeclensionInput,
  DeclensionOutput
} from 'shevchenko';

export const shevchenkoAnthroponym: DeclensionInput = {
  gender: GrammaticalGender.MASCULINE,
  familyName: 'Шевченко',
  givenName: 'Тарас',
  patronymicName: 'Григорович',
};

export interface DeclensionResults {
  nominativeCase: DeclensionOutput | null;
  genitiveCase: DeclensionOutput | null;
  dativeCase: DeclensionOutput | null;
  accusativeCase: DeclensionOutput | null;
  ablativeCase: DeclensionOutput | null;
  locativeCase: DeclensionOutput | null;
  vocativeCase: DeclensionOutput | null;
}

/**
 * Returns true if the given anthroponym is correctly defined.
 * Returns false otherwise.
 */
export function isDefinedAnthroponym(
  anthroponym: Partial<DeclensionInput>,
): anthroponym is DeclensionInput {
  return Boolean(
    anthroponym.gender &&
    Object.values(GrammaticalGender).includes(anthroponym.gender) &&
    (anthroponym.familyName || anthroponym.givenName || anthroponym.patronymicName),
  );
}

export function isShevchenkoAnthroponym(anthroponym: Partial<DeclensionInput>): boolean {
  return (
    anthroponym.gender === shevchenkoAnthroponym.gender &&
    anthroponym.familyName === shevchenkoAnthroponym.familyName &&
    anthroponym.givenName === shevchenkoAnthroponym.givenName &&
    anthroponym.patronymicName === shevchenkoAnthroponym.patronymicName
  );
}

export const useDeclension = createSharedComposable(async (predefinedAnthroponym: DeclensionInput) => {
  let anthroponym: DeclensionInput = reactive({
    gender: GrammaticalGender.MASCULINE,
    familyName: '',
    givenName: '',
    patronymicName: '',
  });

  let initialAnthroponym: DeclensionInput = reactive(shevchenkoAnthroponym);
  if (isDefinedAnthroponym(predefinedAnthroponym)) {
    initialAnthroponym = reactive(predefinedAnthroponym);
    anthroponym = reactive(predefinedAnthroponym);
  }

  const declensionResults: DeclensionResults = reactive({
    nominativeCase: null,
    genitiveCase: null,
    dativeCase: null,
    accusativeCase: null,
    ablativeCase: null,
    locativeCase: null,
    vocativeCase: null,
  });

  async function inflect(input: DeclensionInput): Promise<void> {
    anthroponym.gender = input.gender;
    anthroponym.familyName = input.familyName;
    anthroponym.givenName = input.givenName;
    anthroponym.patronymicName = input.patronymicName;

    const [
      nominativeCase,
      genitiveCase,
      dativeCase,
      accusativeCase,
      ablativeCase,
      locativeCase,
      vocativeCase,
    ] = await Promise.all([
      inNominative(anthroponym),
      inGenitive(anthroponym),
      inDative(anthroponym),
      inAccusative(anthroponym),
      inAblative(anthroponym),
      inLocative(anthroponym),
      inVocative(anthroponym),
    ]);

    declensionResults.nominativeCase = nominativeCase;
    declensionResults.genitiveCase = genitiveCase;
    declensionResults.dativeCase = dativeCase;
    declensionResults.accusativeCase = accusativeCase;
    declensionResults.ablativeCase = ablativeCase;
    declensionResults.locativeCase = locativeCase;
    declensionResults.vocativeCase = vocativeCase;
  }

  await inflect(initialAnthroponym);

  return { anthroponym, declensionResults, inflect };
});
