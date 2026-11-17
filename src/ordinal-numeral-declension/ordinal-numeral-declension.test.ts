import { describe, expect, it } from 'vitest';
import { GrammaticalCase } from '../language';
import { wordInflector } from '../word-declension/bootstrap';
import testData from './ordinal-numeral-declension.test-data.json';

describe('Ordinal numeral declension', () => {
  describe.for(testData)('"$grammaticalCases.nominative" inflection', (dataItem) => {
    it.for(Object.values(GrammaticalCase))(
      'should inflect in %s grammatical case',
      async (grammaticalCase) => {
        const output = await wordInflector.inflect(dataItem.grammaticalCases.nominative, {
          grammaticalCase,
        });

        expect(output).toBe(dataItem.grammaticalCases[grammaticalCase]);
      },
    );
  });
});
