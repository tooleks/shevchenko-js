/* global describe */

'use strict';

const shevchenkoCjs = require('../dist/cjs/shevchenko');
const shevchenkoUmd = require('../dist/umd/shevchenko.min');
const execInputValidationTests = require('./input-validation');
const execAnthroponymInflectionTests = require('./anthroponym-inflection');
const execGenderDetectionTests = require('./gender-detection');

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
