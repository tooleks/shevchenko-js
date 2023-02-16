import * as shevchenko from '../src';
import declensionSamples from './anthroponym-declension.samples.json';

declensionSamples.forEach((declensionSample) => {
  const input = {
    gender: declensionSample.gender,
    ...declensionSample.grammaticalCases.nominative,
  } as shevchenko.DeclensionInput;

  describe(`"${input.givenName} ${input.patronymicName} ${input.familyName}" inflection`, () => {
    it(`should inflect in nominative grammatical case`, async () => {
      const output = await shevchenko.inNominative(input);
      expect(output.givenName).toStrictEqual(
        declensionSample.grammaticalCases.nominative.givenName,
      );
      expect(output.patronymicName).toStrictEqual(
        declensionSample.grammaticalCases.nominative.patronymicName,
      );
      expect(output.familyName).toStrictEqual(
        declensionSample.grammaticalCases.nominative.familyName,
      );
    });

    it(`should inflect in genitive grammatical case`, async () => {
      const output = await shevchenko.inGenitive(input);
      expect(output.givenName).toStrictEqual(declensionSample.grammaticalCases.genitive.givenName);
      expect(output.patronymicName).toStrictEqual(
        declensionSample.grammaticalCases.genitive.patronymicName,
      );
      expect(output.familyName).toStrictEqual(
        declensionSample.grammaticalCases.genitive.familyName,
      );
    });

    it(`should inflect in dative grammatical case`, async () => {
      const output = await shevchenko.inDative(input);
      expect(output.givenName).toStrictEqual(declensionSample.grammaticalCases.dative.givenName);
      expect(output.patronymicName).toStrictEqual(
        declensionSample.grammaticalCases.dative.patronymicName,
      );
      expect(output.familyName).toStrictEqual(declensionSample.grammaticalCases.dative.familyName);
    });

    it(`should inflect in accusative grammatical case`, async () => {
      const output = await shevchenko.inAccusative(input);
      expect(output.givenName).toStrictEqual(
        declensionSample.grammaticalCases.accusative.givenName,
      );
      expect(output.patronymicName).toStrictEqual(
        declensionSample.grammaticalCases.accusative.patronymicName,
      );
      expect(output.familyName).toStrictEqual(
        declensionSample.grammaticalCases.accusative.familyName,
      );
    });

    it(`should inflect in ablative grammatical case`, async () => {
      const output = await shevchenko.inAblative(input);
      expect(output.givenName).toStrictEqual(declensionSample.grammaticalCases.ablative.givenName);
      expect(output.patronymicName).toStrictEqual(
        declensionSample.grammaticalCases.ablative.patronymicName,
      );
      expect(output.familyName).toStrictEqual(
        declensionSample.grammaticalCases.ablative.familyName,
      );
    });

    it(`should inflect in locative grammatical case`, async () => {
      const output = await shevchenko.inLocative(input);
      expect(output.givenName).toStrictEqual(declensionSample.grammaticalCases.locative.givenName);
      expect(output.patronymicName).toStrictEqual(
        declensionSample.grammaticalCases.locative.patronymicName,
      );
      expect(output.familyName).toStrictEqual(
        declensionSample.grammaticalCases.locative.familyName,
      );
    });

    it(`should inflect in vocative grammatical case`, async () => {
      const output = await shevchenko.inVocative(input);
      expect(output.givenName).toStrictEqual(declensionSample.grammaticalCases.vocative.givenName);
      expect(output.patronymicName).toStrictEqual(
        declensionSample.grammaticalCases.vocative.patronymicName,
      );
      expect(output.familyName).toStrictEqual(
        declensionSample.grammaticalCases.vocative.familyName,
      );
    });
  });
});
