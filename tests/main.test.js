/* eslint-disable @typescript-eslint/no-var-requires */
const shevchenkoCjs = require('../dist/cjs/shevchenko');
const shevchenkoUmd = require('../dist/umd/shevchenko.min');
const execAnthroponymInflectionTests = require('./anthroponym-inflection');
const execGenderDetectionTests = require('./gender-detection');
const execInputValidationTests = require('./input-validation');

describe('CJS (CommonJS)', () => {
  execInputValidationTests(shevchenkoCjs);
  execAnthroponymInflectionTests(shevchenkoCjs);
  execGenderDetectionTests(shevchenkoCjs);
});

describe('UMD (Universal Module Definition)', () => {
  execInputValidationTests(shevchenkoUmd);
  execAnthroponymInflectionTests(shevchenkoUmd);
  execGenderDetectionTests(shevchenkoUmd);
});
