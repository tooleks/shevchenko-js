var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection шевченко тарас григорович", function () {

    var person = {
        gender: "male",
        lastName: "шевченко",
        firstName: "тарас",
        middleName: "григорович"
    };

    var validResults = {
        nominative: {
            lastName: "шевченко",
            firstName: "тарас",
            middleName: "григорович"
        },
        genitive: {
            lastName: "шевченка",
            firstName: "тараса",
            middleName: "григоровича"
        },
        dative: {
            lastName: "шевченку",
            firstName: "тарасу",
            middleName: "григоровичу"
        },
        accusative: {
            lastName: "шевченка",
            firstName: "тараса",
            middleName: "григоровича"
        },
        ablative: {
            lastName: "шевченком",
            firstName: "тарасом",
            middleName: "григоровичем"
        },
        locative: {
            lastName: "шевченкові",
            firstName: "тарасові",
            middleName: "григоровичу"
        },
        vocative: {
            lastName: "шевченку",
            firstName: "тарасе",
            middleName: "григоровичу"
        }
    };

    testInflections(person, validResults);

});
