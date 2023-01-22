/* eslint-disable @typescript-eslint/no-var-requires */
const samples = require('./samples.json');

module.exports = (shevchenko) => {
  samples.forEach((sample) => {
    const anthroponym = { gender: sample.gender, ...sample.grammaticalCases.nominative };
    describe(`"${anthroponym.firstName} ${anthroponym.middleName} ${anthroponym.lastName}" inflection`, () => {
      it(`should inflect in nominative grammatical case`, () => {
        const result = shevchenko.inNominative(anthroponym);
        expect(result.firstName).toStrictEqual(sample.grammaticalCases.nominative.firstName);
        expect(result.middleName).toStrictEqual(sample.grammaticalCases.nominative.middleName);
        expect(result.lastName).toStrictEqual(sample.grammaticalCases.nominative.lastName);
      });

      it(`should inflect in genitive grammatical case`, () => {
        const result = shevchenko.inGenitive(anthroponym);
        expect(result.firstName).toStrictEqual(sample.grammaticalCases.genitive.firstName);
        expect(result.middleName).toStrictEqual(sample.grammaticalCases.genitive.middleName);
        expect(result.lastName).toStrictEqual(sample.grammaticalCases.genitive.lastName);
      });

      it(`should inflect in dative grammatical case`, () => {
        const result = shevchenko.inDative(anthroponym);
        expect(result.firstName).toStrictEqual(sample.grammaticalCases.dative.firstName);
        expect(result.middleName).toStrictEqual(sample.grammaticalCases.dative.middleName);
        expect(result.lastName).toStrictEqual(sample.grammaticalCases.dative.lastName);
      });

      it(`should inflect in accusative grammatical case`, () => {
        const result = shevchenko.inAccusative(anthroponym);
        expect(result.firstName).toStrictEqual(sample.grammaticalCases.accusative.firstName);
        expect(result.middleName).toStrictEqual(sample.grammaticalCases.accusative.middleName);
        expect(result.lastName).toStrictEqual(sample.grammaticalCases.accusative.lastName);
      });

      it(`should inflect in ablative grammatical case`, () => {
        const result = shevchenko.inAblative(anthroponym);
        expect(result.firstName).toStrictEqual(sample.grammaticalCases.ablative.firstName);
        expect(result.middleName).toStrictEqual(sample.grammaticalCases.ablative.middleName);
        expect(result.lastName).toStrictEqual(sample.grammaticalCases.ablative.lastName);
      });

      it(`should inflect in locative grammatical case`, () => {
        const result = shevchenko.inLocative(anthroponym);
        expect(result.firstName).toStrictEqual(sample.grammaticalCases.locative.firstName);
        expect(result.middleName).toStrictEqual(sample.grammaticalCases.locative.middleName);
        expect(result.lastName).toStrictEqual(sample.grammaticalCases.locative.lastName);
      });

      it(`should inflect in vocative grammatical case`, () => {
        const result = shevchenko.inVocative(anthroponym);
        expect(result.firstName).toStrictEqual(sample.grammaticalCases.vocative.firstName);
        expect(result.middleName).toStrictEqual(sample.grammaticalCases.vocative.middleName);
        expect(result.lastName).toStrictEqual(sample.grammaticalCases.vocative.lastName);
      });
    });
  });
};
