var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection стрілець марко ігорович", function () {

    var person = {
        gender: "male",
        lastName: "стрілець",
        firstName: "марко",
        middleName: "ігорович"
    };

    var validResults = {
        nominative: {
            lastName: "стрілець",
            firstName: "марко",
            middleName: "ігорович"
        },
        genitive: {
            lastName: "стрільця",
            firstName: "марка",
            middleName: "ігоровича"
        },
        dative: {
            lastName: "стрільцю",
            firstName: "марку",
            middleName: "ігоровичу"
        },
        accusative: {
            lastName: "стрільця",
            firstName: "марка",
            middleName: "ігоровича"
        },
        ablative: {
            lastName: "стрільцем",
            firstName: "марком",
            middleName: "ігоровичем"
        },
        locative: {
            lastName: "стрільцю",
            firstName: "маркові",
            middleName: "ігоровичу"
        },
        vocative: {
            lastName: "стрільцю",
            firstName: "марку",
            middleName: "ігоровичу"
        }
    };

    testInflections(person, validResults);

});
