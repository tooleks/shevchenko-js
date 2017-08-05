var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection свинець ілля олександрович", function () {

    var person = {
        gender: "male",
        lastName: "свинець",
        firstName: "ілля",
        middleName: "олександрович"
    };

    var validResults = {
        nominative: {
            lastName: "свинець",
            firstName: "ілля",
            middleName: "олександрович"
        },
        genitive: {
            lastName: "свинця",
            firstName: "іллі",
            middleName: "олександровича"
        },
        dative: {
            lastName: "свинцю",
            firstName: "іллі",
            middleName: "олександровичу"
        },
        accusative: {
            lastName: "свинця",
            firstName: "іллю",
            middleName: "олександровича"
        },
        ablative: {
            lastName: "свинцем",
            firstName: "іллею",
            middleName: "олександровичем"
        },
        locative: {
            lastName: "свинцю",
            firstName: "іллі",
            middleName: "олександровичу"
        },
        vocative: {
            lastName: "свинцю",
            firstName: "ілле",
            middleName: "олександровичу"
        }
    };

    testInflections(person, validResults);

});
