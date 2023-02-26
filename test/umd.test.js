// eslint-disable-next-line @typescript-eslint/no-var-requires
const shevchenko = require('../dist/umd/shevchenko.min');

describe('UMD module', () => {
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
});
