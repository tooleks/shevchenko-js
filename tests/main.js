/* global describe */

'use strict';

const shevchenkoCjs = require('../dist/cjs/shevchenko');
const shevchenkoUmd = require('../dist/umd/shevchenko.min');
const runIntegrationTestCase = require('./integration');
const runInflectionTestCase = require('./inflection');

describe('cjs module', () => {
  runIntegrationTestCase(shevchenkoCjs);
  runInflectionTestCase(shevchenkoCjs);
});

describe('umd module', () => {
  runIntegrationTestCase(shevchenkoUmd);
  runInflectionTestCase(shevchenkoUmd);
});
