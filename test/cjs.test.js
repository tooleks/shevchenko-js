// eslint-disable-next-line @typescript-eslint/no-var-requires
const shevchenko = require('../dist/cjs');

describe('CJS module', () => {
  it('should export public API', () => {
    expect(shevchenko.GrammaticalGender).toBeDefined();
    expect(shevchenko.GrammaticalCase).toBeDefined();
    expect(shevchenko.inNominative).toBeDefined();
    expect(shevchenko.inGenitive).toBeDefined();
    expect(shevchenko.inDative).toBeDefined();
    expect(shevchenko.inAccusative).toBeDefined();
    expect(shevchenko.inAblative).toBeDefined();
    expect(shevchenko.inLocative).toBeDefined();
    expect(shevchenko.inVocative).toBeDefined();
    expect(shevchenko.detectGender).toBeDefined();
  });

  it('should perform the declension', async () => {
    const result = await shevchenko.inVocative({
      gender: await shevchenko.detectGender({ patronymicName: 'Григорович' }),
      familyName: 'Шевченко',
      givenName: 'Тарас',
      patronymicName: 'Григорович',
    });

    expect(result).toStrictEqual({
      familyName: 'Шевченку',
      givenName: 'Тарасе',
      patronymicName: 'Григоровичу',
    });
  });
});
