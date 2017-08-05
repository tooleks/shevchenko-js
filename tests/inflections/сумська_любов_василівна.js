var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection сумська любов василівна", function () {

    var person = {
        gender: "female",
        lastName: "сумська",
        firstName: "любов",
        middleName: "василівна"
    };

    var validResults = {
        nominative: {
            lastName: "сумська",
            firstName: "любов",
            middleName: "василівна"
        },
        genitive: {
            lastName: "сумської",
            firstName: "любові",
            middleName: "василівни"
        },
        dative: {
            lastName: "сумській",
            firstName: "любові",
            middleName: "василівні"
        },
        accusative: {
            lastName: "сумську",
            firstName: "любов",
            middleName: "василівну"
        },
        ablative: {
            lastName: "сумською",
            firstName: "любов'ю",
            middleName: "василівною"
        },
        locative: {
            lastName: "сумській",
            firstName: "любові",
            middleName: "василівні"
        },
        vocative: {
            lastName: "сумська",
            firstName: "любове",
            middleName: "василівно"
        }
    };

    testInflections(person, validResults);

});
