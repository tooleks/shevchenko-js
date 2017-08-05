var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection живаго грег антонович", function () {

    var person = {
        gender: "male",
        lastName: "живаго",
        firstName: "грег",
        middleName: "антонович"
    };

    var validResults = {
        nominative: {
            lastName: "живаго",
            firstName: "грег",
            middleName: "антонович"
        },
        genitive: {
            lastName: "живаго",
            firstName: "грега",
            middleName: "антоновича"
        },
        dative: {
            lastName: "живаго",
            firstName: "грегу",
            middleName: "антоновичу"
        },
        accusative: {
            lastName: "живаго",
            firstName: "грега",
            middleName: "антоновича"
        },
        ablative: {
            lastName: "живаго",
            firstName: "грегом",
            middleName: "антоновичем"
        },
        locative: {
            lastName: "живаго",
            firstName: "грегові",
            middleName: "антоновичу"
        },
        vocative: {
            lastName: "живаго",
            firstName: "грегу",
            middleName: "антоновичу"
        }
    };

    testInflections(person, validResults);

});
