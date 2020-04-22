/* global describe */

'use strict';

const shevchenkoCjs = require('../dist/cjs/main');
const shevchenkoUmd = require('../dist/umd/main');
const runIntegrationTestCase = require('./integration');
const runInflectionTestCase = require('./inflection');

describe('cjs module', () => {
  runIntegrationTestCase(shevchenkoUmd);
  runInflectionTestCase(shevchenkoCjs);
});

describe('umd module', () => {
  runIntegrationTestCase(shevchenkoUmd);
  runInflectionTestCase(shevchenkoUmd);
});
