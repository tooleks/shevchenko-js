import { createSharedComposable } from '@vueuse/core';
import { reactive } from 'vue';
import {
  inNominative,
  inGenitive,
  inDative,
  inAccusative,
  inAblative,
  inLocative,
  inVocative,
  DeclensionInput,
  DeclensionOutput,
} from 'shevchenko';

export interface DeclensionResults {
  nominativeCase: DeclensionOutput | null;
  genitiveCase: DeclensionOutput | null;
  dativeCase: DeclensionOutput | null;
  accusativeCase: DeclensionOutput | null;
  ablativeCase: DeclensionOutput | null;
  locativeCase: DeclensionOutput | null;
  vocativeCase: DeclensionOutput | null;
}

export const useDeclension = createSharedComposable(
  async (defaultDeclensionInput: DeclensionInput) => {
    const declensionInput = reactive<DeclensionInput>({
      gender: defaultDeclensionInput.gender,
      familyName: defaultDeclensionInput.familyName,
      givenName: defaultDeclensionInput.givenName,
      patronymicName: defaultDeclensionInput.patronymicName,
    });

    const declensionResults = reactive<DeclensionResults>({
      nominativeCase: null,
      genitiveCase: null,
      dativeCase: null,
      accusativeCase: null,
      ablativeCase: null,
      locativeCase: null,
      vocativeCase: null,
    });

    async function inflect(declensionInputChange: DeclensionInput): Promise<void> {
      declensionInput.gender = declensionInputChange.gender;
      declensionInput.familyName = declensionInputChange.familyName;
      declensionInput.givenName = declensionInputChange.givenName;
      declensionInput.patronymicName = declensionInputChange.patronymicName;

      const [
        nominativeCaseResult,
        genitiveCaseResult,
        dativeCaseResult,
        accusativeCaseResult,
        ablativeCaseResult,
        locativeCaseResult,
        vocativeCaseResult,
      ] = await Promise.all([
        inNominative(declensionInput),
        inGenitive(declensionInput),
        inDative(declensionInput),
        inAccusative(declensionInput),
        inAblative(declensionInput),
        inLocative(declensionInput),
        inVocative(declensionInput),
      ]);

      declensionResults.nominativeCase = nominativeCaseResult;
      declensionResults.genitiveCase = genitiveCaseResult;
      declensionResults.dativeCase = dativeCaseResult;
      declensionResults.accusativeCase = accusativeCaseResult;
      declensionResults.ablativeCase = ablativeCaseResult;
      declensionResults.locativeCase = locativeCaseResult;
      declensionResults.vocativeCase = vocativeCaseResult;
    }

    await inflect(defaultDeclensionInput);

    return { declensionInput, declensionResults, inflect };
  },
);
