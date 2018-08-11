import shevchenkoCjs from "../dist/shevchenko.cjs.js";
import shevchenkoUmd from "../dist/shevchenko.umd.js";
import shevchenkoUmdMin from "../dist/shevchenko.umd.min.js";

import integrationTest from "./integration";
import inflectionTest from "./inflection";
import learningRateTest from "./learningRate";

describe("CommonJS module test", function() {
    integrationTest(shevchenkoCjs);
    inflectionTest(shevchenkoCjs);
});

describe("UMD module test", function() {
    integrationTest(shevchenkoUmd);
    inflectionTest(shevchenkoUmd);
});

describe("UMD minified module test", function() {
    integrationTest(shevchenkoUmdMin);
    inflectionTest(shevchenkoUmdMin);
});

describe("Learning rate test", function() {
    learningRateTest();
});
