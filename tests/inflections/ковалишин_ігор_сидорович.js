var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection ковалишин ігор сидорович", function () {

    var person = {
        gender: "male",
        lastName: "ковалишин",
        firstName: "ігор",
        middleName: "сидорович"
    };

    var validResults = {
        nominative: {
            lastName: "ковалишин",
            firstName: "ігор",
            middleName: "сидорович"
        },
        genitive: {
            lastName: "ковалишина",
            firstName: "ігоря",
            middleName: "сидоровича"
        },
        dative: {
            lastName: "ковалишину",
            firstName: "ігорю",
            middleName: "сидоровичу"
        },
        accusative: {
            lastName: "ковалишина",
            firstName: "ігоря",
            middleName: "сидоровича"
        },
        ablative: {
            lastName: "ковалишиним",
            firstName: "ігорем",
            middleName: "сидоровичем"
        },
        locative: {
            lastName: "ковалишину",
            firstName: "ігорю",
            middleName: "сидоровичу"
        },
        vocative: {
            lastName: "ковалишине",
            firstName: "ігорю",
            middleName: "сидоровичу"
        }
    };

    testInflections(person, validResults);

});
