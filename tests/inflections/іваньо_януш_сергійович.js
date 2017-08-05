var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection іваньо януш сергійович", function () {

    var person = {
        gender: "male",
        lastName: "іваньо",
        firstName: "януш",
        middleName: "сергійович"
    };

    var validResults = {
        nominative: {
            lastName: "іваньо",
            firstName: "януш",
            middleName: "сергійович"
        },
        genitive: {
            lastName: "іваня",
            firstName: "януша",
            middleName: "сергійовича"
        },
        dative: {
            lastName: "іваньові",
            firstName: "янушу",
            middleName: "сергійовичу"
        },
        accusative: {
            lastName: "іваня",
            firstName: "януша",
            middleName: "сергійовича"
        },
        ablative: {
            lastName: "іваньом",
            firstName: "янушем",
            middleName: "сергійовичем"
        },
        locative: {
            lastName: "іваньові",
            firstName: "янушеві",
            middleName: "сергійовичу"
        },
        vocative: {
            lastName: "іваньо",
            firstName: "януше",
            middleName: "сергійовичу"
        }
    };

    testInflections(person, validResults);

});
