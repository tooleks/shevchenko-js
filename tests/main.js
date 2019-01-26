import shevchenkoCjs from '../dist/shevchenko.cjs.js';
import shevchenkoUmd from '../dist/shevchenko.umd.js';
import shevchenkoBundleMin from '../dist/shevchenko.bundle.min.js';

import integrationTest from './integration';
import inflectionTest from './inflection';
import learningRateTest from './learningRate';

describe('CommonJS module test', function() {
  integrationTest(shevchenkoCjs);
  inflectionTest(shevchenkoCjs);
});

describe('UMD module test', function() {
  integrationTest(shevchenkoUmd);
  inflectionTest(shevchenkoUmd);
});

describe('Bundle module test', function() {
  integrationTest(shevchenkoBundleMin);
  inflectionTest(shevchenkoBundleMin);
});

describe('Learning rate test', function() {
  learningRateTest();
});
