/* global describe */

'use strict';

const shevchenkoCjs = require('../dist/cjs/shevchenko');
const shevchenkoUmd = require('../dist/umd/shevchenko.min');
const execInputValidationTests = require('./input-validation');
const execAnthroponymInflectionTests = require('./anthroponym-inflection');
const execGenderDetectionTests = require('./gender-detection');

describe('cjs module', () => {
  execInputValidationTests(shevchenkoCjs);
  execAnthroponymInflectionTests(shevchenkoCjs);
  execGenderDetectionTests(shevchenkoCjs);
});

describe('umd module', () => {
  execInputValidationTests(shevchenkoUmd);
  execAnthroponymInflectionTests(shevchenkoUmd);
  execGenderDetectionTests(shevchenkoUmd);
});
