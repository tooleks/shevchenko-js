import { describe, expect, it } from 'vitest';
import { GrammaticalCase, GrammaticalGender } from '../language';
import { Anthroponym } from './anthroponym';
import testData from './anthroponym-inflector.test-data.json';
import { anthroponymInflector } from './bootstrap';

describe('AnthroponymInflector', () => {
  describe.for(testData)(
    '"$grammaticalCases.nominative.givenName $grammaticalCases.nominative.patronymicName $grammaticalCases.nominative.familyName" inflection',
    (dataItem) => {
      const anthroponym = dataItem.grammaticalCases.nominative as Anthroponym;
      const gender = dataItem.gender as GrammaticalGender;

      it.for(Object.values(GrammaticalCase))(
        'should inflect in %s grammatical case',
        async (grammaticalCase) => {
          const { givenName, patronymicName, familyName } = await anthroponymInflector.inflect(
            anthroponym,
            gender,
            grammaticalCase,
          );

          expect({ givenName, patronymicName, familyName }).toStrictEqual(
            dataItem.grammaticalCases[grammaticalCase],
          );
        },
      );
    },
  );
});
