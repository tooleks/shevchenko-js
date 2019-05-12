import shevchenkoUmd from "../dist/shevchenko.umd.js";
import shevchenkoBundleMin from "../dist/shevchenko.bundle.min.js";

import integrationTest from "./integration";
import inflectionTest from "./inflection";
import learningRateTest from "./learningRate";

describe("umd module", function() {
  integrationTest(shevchenkoUmd);
  inflectionTest(shevchenkoUmd);
});

describe("bundle module", function() {
  integrationTest(shevchenkoBundleMin);
  inflectionTest(shevchenkoBundleMin);
});

describe("learning rate", function() {
  learningRateTest();
});
