/* global describe */

'use strict';

const shevchenkoCjs = require('../dist/cjs/shevchenko');
const shevchenkoUmd = require('../dist/umd/shevchenko.min');
const runUnitTestCase = require('./unit');
const runInflectionTestCase = require('./inflection');

describe('cjs module', () => {
  runUnitTestCase(shevchenkoCjs);
  runInflectionTestCase(shevchenkoCjs);
});

describe('umd module', () => {
  runUnitTestCase(shevchenkoUmd);
  runInflectionTestCase(shevchenkoUmd);
});
