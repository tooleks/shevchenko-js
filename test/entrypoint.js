/* global describe, it */

'use strict';

const shevchenkoCjs = require('../dist-ts/main');
const inflectionTest = require('./inflection');

describe('cjs module', function () {
  // integrationTest(shevchenkoUmd);
  inflectionTest(shevchenkoCjs);
});
//
// describe("bundle module", function() {
//   integrationTest(shevchenkoBundleMin);
//   inflectionTest(shevchenkoBundleMin);
// });
//
// describe("learning rate", function() {
//   learningRateTest();
// });
