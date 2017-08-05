var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection петренко петро петрович", function () {

    var person = {
        gender: "male",
        lastName: "петренко",
        firstName: "петро",
        middleName: "петрович"
    };

    var validResults = {
        nominative: {
            lastName: "петренко",
            firstName: "петро",
            middleName: "петрович"
        },
        genitive: {
            lastName: "петренка",
            firstName: "петра",
            middleName: "петровича"
        },
        dative: {
            lastName: "петренку",
            firstName: "петру",
            middleName: "петровичу"
        },
        accusative: {
            lastName: "петренка",
            firstName: "петра",
            middleName: "петровича"
        },
        ablative: {
            lastName: "петренком",
            firstName: "петром",
            middleName: "петровичем"
        },
        locative: {
            lastName: "петренкові",
            firstName: "петрові",
            middleName: "петровичу"
        },
        vocative: {
            lastName: "петренку",
            firstName: "петре",
            middleName: "петровичу"
        }
    };

    testInflections(person, validResults);

});
