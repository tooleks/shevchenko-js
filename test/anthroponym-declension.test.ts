import * as shevchenko from '../src';
import samples from './anthroponym-declension.samples.json';

samples.forEach((sample) => {
  const anthroponym = {
    gender: sample.gender,
    ...sample.grammaticalCases.nominative,
  } as shevchenko.InflectAnthroponymParams;

  describe(`"${anthroponym.givenName} ${anthroponym.patronymicName} ${anthroponym.familyName}" inflection`, () => {
    it(`should inflect in nominative grammatical case`, async () => {
      const result = await shevchenko.inNominative(anthroponym);
      expect(result.givenName).toStrictEqual(sample.grammaticalCases.nominative.givenName);
      expect(result.patronymicName).toStrictEqual(
        sample.grammaticalCases.nominative.patronymicName,
      );
      expect(result.familyName).toStrictEqual(sample.grammaticalCases.nominative.familyName);
    });

    it(`should inflect in genitive grammatical case`, async () => {
      const result = await shevchenko.inGenitive(anthroponym);
      expect(result.givenName).toStrictEqual(sample.grammaticalCases.genitive.givenName);
      expect(result.patronymicName).toStrictEqual(sample.grammaticalCases.genitive.patronymicName);
      expect(result.familyName).toStrictEqual(sample.grammaticalCases.genitive.familyName);
    });

    it(`should inflect in dative grammatical case`, async () => {
      const result = await shevchenko.inDative(anthroponym);
      expect(result.givenName).toStrictEqual(sample.grammaticalCases.dative.givenName);
      expect(result.patronymicName).toStrictEqual(sample.grammaticalCases.dative.patronymicName);
      expect(result.familyName).toStrictEqual(sample.grammaticalCases.dative.familyName);
    });

    it(`should inflect in accusative grammatical case`, async () => {
      const result = await shevchenko.inAccusative(anthroponym);
      expect(result.givenName).toStrictEqual(sample.grammaticalCases.accusative.givenName);
      expect(result.patronymicName).toStrictEqual(
        sample.grammaticalCases.accusative.patronymicName,
      );
      expect(result.familyName).toStrictEqual(sample.grammaticalCases.accusative.familyName);
    });

    it(`should inflect in ablative grammatical case`, async () => {
      const result = await shevchenko.inAblative(anthroponym);
      expect(result.givenName).toStrictEqual(sample.grammaticalCases.ablative.givenName);
      expect(result.patronymicName).toStrictEqual(sample.grammaticalCases.ablative.patronymicName);
      expect(result.familyName).toStrictEqual(sample.grammaticalCases.ablative.familyName);
    });

    it(`should inflect in locative grammatical case`, async () => {
      const result = await shevchenko.inLocative(anthroponym);
      expect(result.givenName).toStrictEqual(sample.grammaticalCases.locative.givenName);
      expect(result.patronymicName).toStrictEqual(sample.grammaticalCases.locative.patronymicName);
      expect(result.familyName).toStrictEqual(sample.grammaticalCases.locative.familyName);
    });

    it(`should inflect in vocative grammatical case`, async () => {
      const result = await shevchenko.inVocative(anthroponym);
      expect(result.givenName).toStrictEqual(sample.grammaticalCases.vocative.givenName);
      expect(result.patronymicName).toStrictEqual(sample.grammaticalCases.vocative.patronymicName);
      expect(result.familyName).toStrictEqual(sample.grammaticalCases.vocative.familyName);
    });
  });
});
