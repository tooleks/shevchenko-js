import { describe, expect, it } from 'vitest';
import { DeclensionInput, DeclensionOutput } from '../contracts';
import { FieldName, registerExtension } from '../extension';
import { GrammaticalCase, GrammaticalGender } from '../language';
import {
  inAblative,
  inAccusative,
  inDative,
  inGenitive,
  inLocative,
  inNominative,
  inVocative,
} from '../shevchenko';
import testData from './ordinal-numeral-declension.test-data.json';

type OrdinalNumeralDeclensionInput = DeclensionInput & { ordinalNumeral?: string };

const inflectors: Record<GrammaticalCase, typeof inNominative> = {
  [GrammaticalCase.NOMINATIVE]: inNominative,
  [GrammaticalCase.GENITIVE]: inGenitive,
  [GrammaticalCase.DATIVE]: inDative,
  [GrammaticalCase.ACCUSATIVE]: inAccusative,
  [GrammaticalCase.ABLATIVE]: inAblative,
  [GrammaticalCase.LOCATIVE]: inLocative,
  [GrammaticalCase.VOCATIVE]: inVocative,
};

registerExtension(({ wordInflector }) => ({
  fieldNames: ['ordinalNumeral' as FieldName],
  afterInflect: async (grammaticalCase, input) => {
    const { ordinalNumeral } = input as OrdinalNumeralDeclensionInput;
    const output = {} as DeclensionOutput<typeof input>;
    if (ordinalNumeral != null) {
      Object.assign(output, {
        ordinalNumeral: await wordInflector.inflect(ordinalNumeral, { grammaticalCase }),
      });
    }
    return output;
  },
}));

describe('Ordinal numeral declension', () => {
  describe.for(testData)('"$grammaticalCases.nominative" ($gender) inflection', (dataItem) => {
    it.for(Object.values(GrammaticalCase))(
      'should inflect in %s grammatical case',
      async (grammaticalCase) => {
        const output = await inflectors[grammaticalCase]({
          gender: dataItem.gender as GrammaticalGender,
          ordinalNumeral: dataItem.grammaticalCases.nominative,
        });

        expect(output).toStrictEqual({
          ordinalNumeral: dataItem.grammaticalCases[grammaticalCase],
        });
      },
    );
  });
});
