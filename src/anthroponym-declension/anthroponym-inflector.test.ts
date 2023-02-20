import { GrammaticalCase, GrammaticalGender } from '../language';
import { Anthroponym } from './anthroponym';
import testData from './anthroponym-inflector.test-data.json';
import { anthroponymInflector } from './bootstrap';

describe('AnthroponymInflector', () => {
  testData.forEach((dataItem) => {
    const anthroponym = dataItem.grammaticalCases.nominative as Anthroponym;
    const gender = dataItem.gender as GrammaticalGender;

    describe(`"${anthroponym.givenName} ${anthroponym.patronymicName} ${anthroponym.familyName}" inflection`, () => {
      it('should inflect in nominative grammatical case', async () => {
        const result = await anthroponymInflector.inflect(
          anthroponym,
          gender,
          GrammaticalCase.NOMINATIVE,
        );

        expect(result.givenName).toStrictEqual(dataItem.grammaticalCases.nominative.givenName);
        expect(result.patronymicName).toStrictEqual(
          dataItem.grammaticalCases.nominative.patronymicName,
        );
        expect(result.familyName).toStrictEqual(dataItem.grammaticalCases.nominative.familyName);
      });

      it('should inflect in genitive grammatical case', async () => {
        const result = await anthroponymInflector.inflect(
          anthroponym,
          gender,
          GrammaticalCase.GENITIVE,
        );

        expect(result.givenName).toStrictEqual(dataItem.grammaticalCases.genitive.givenName);
        expect(result.patronymicName).toStrictEqual(
          dataItem.grammaticalCases.genitive.patronymicName,
        );
        expect(result.familyName).toStrictEqual(dataItem.grammaticalCases.genitive.familyName);
      });

      it('should inflect in dative grammatical case', async () => {
        const result = await anthroponymInflector.inflect(
          anthroponym,
          gender,
          GrammaticalCase.DATIVE,
        );

        expect(result.givenName).toStrictEqual(dataItem.grammaticalCases.dative.givenName);
        expect(result.patronymicName).toStrictEqual(
          dataItem.grammaticalCases.dative.patronymicName,
        );
        expect(result.familyName).toStrictEqual(dataItem.grammaticalCases.dative.familyName);
      });

      it('should inflect in accusative grammatical case', async () => {
        const result = await anthroponymInflector.inflect(
          anthroponym,
          gender,
          GrammaticalCase.ACCUSATIVE,
        );

        expect(result.givenName).toStrictEqual(dataItem.grammaticalCases.accusative.givenName);
        expect(result.patronymicName).toStrictEqual(
          dataItem.grammaticalCases.accusative.patronymicName,
        );
        expect(result.familyName).toStrictEqual(dataItem.grammaticalCases.accusative.familyName);
      });

      it('should inflect in ablative grammatical case', async () => {
        const result = await anthroponymInflector.inflect(
          anthroponym,
          gender,
          GrammaticalCase.ABLATIVE,
        );

        expect(result.givenName).toStrictEqual(dataItem.grammaticalCases.ablative.givenName);
        expect(result.patronymicName).toStrictEqual(
          dataItem.grammaticalCases.ablative.patronymicName,
        );
        expect(result.familyName).toStrictEqual(dataItem.grammaticalCases.ablative.familyName);
      });

      it('should inflect in locative grammatical case', async () => {
        const result = await anthroponymInflector.inflect(
          anthroponym,
          gender,
          GrammaticalCase.LOCATIVE,
        );

        expect(result.givenName).toStrictEqual(dataItem.grammaticalCases.locative.givenName);
        expect(result.patronymicName).toStrictEqual(
          dataItem.grammaticalCases.locative.patronymicName,
        );
        expect(result.familyName).toStrictEqual(dataItem.grammaticalCases.locative.familyName);
      });

      it('should inflect in vocative grammatical case', async () => {
        const result = await anthroponymInflector.inflect(
          anthroponym,
          gender,
          GrammaticalCase.VOCATIVE,
        );

        expect(result.givenName).toStrictEqual(dataItem.grammaticalCases.vocative.givenName);
        expect(result.patronymicName).toStrictEqual(
          dataItem.grammaticalCases.vocative.patronymicName,
        );
        expect(result.familyName).toStrictEqual(dataItem.grammaticalCases.vocative.familyName);
      });
    });
  });
});
