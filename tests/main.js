import cjs from '../dist/shevchenko.cjs.js';
import umd from '../dist/shevchenko.umd.js';
import bundleMin from '../dist/shevchenko.bundle.min.js';

import integrationTest from './integration';
import inflectionTest from './inflection';
import learningRateTest from './learningRate';

describe('CommonJS module test', function() {
  integrationTest(cjs);
  inflectionTest(cjs);
});

describe('UMD module test', function() {
  integrationTest(umd);
  inflectionTest(umd);
});

describe('bundle module test', function() {
  integrationTest(bundleMin);
  inflectionTest(bundleMin);
});

describe('learning rate test', function() {
  learningRateTest();
});
