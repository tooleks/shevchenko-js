import { describe, expect, it } from 'vitest';
import { GrammaticalCase, GrammaticalGender } from '../language';
import testData from './anthroponym-inflector.test-data.json';
import { anthroponymInflector } from './bootstrap';

describe('AnthroponymInflector', () => {
  describe.for(testData)('"$grammaticalCases.nominative" ($gender) inflection', (dataItem) => {
    const [familyName, givenName, patronymicName] = dataItem.grammaticalCases.nominative.split(' ');
    const gender = dataItem.gender as GrammaticalGender;

    it.for(Object.values(GrammaticalCase))(
      'should inflect in %s grammatical case',
      async (grammaticalCase) => {
        const output = await anthroponymInflector.inflect(
          { familyName, givenName, patronymicName },
          gender,
          grammaticalCase,
        );

        expect(`${output.familyName} ${output.givenName} ${output.patronymicName}`).toBe(
          dataItem.grammaticalCases[grammaticalCase],
        );
      },
    );
  });
});
