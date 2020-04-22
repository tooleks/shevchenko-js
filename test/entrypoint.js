/* global describe, it */

'use strict';

const shevchenko = require('../dist/cjs/main');
const inflectionTest = require('./inflection');

console.log(shevchenko);

describe('cjs module', function () {
  // integrationTest(shevchenkoUmd);
  inflectionTest(shevchenko);
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
