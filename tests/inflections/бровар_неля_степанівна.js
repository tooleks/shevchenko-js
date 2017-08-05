var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection бровар неля степанівна", function () {

    var person = {
        gender: "female",
        lastName: "бровар",
        firstName: "неля",
        middleName: "степанівна"
    };

    var validResults = {
        nominative: {
            lastName: "бровар",
            firstName: "неля",
            middleName: "степанівна"
        },
        genitive: {
            lastName: "бровар",
            firstName: "нелі",
            middleName: "степанівни"
        },
        dative: {
            lastName: "бровар",
            firstName: "нелі",
            middleName: "степанівні"
        },
        accusative: {
            lastName: "бровар",
            firstName: "нелю",
            middleName: "степанівну"
        },
        ablative: {
            lastName: "бровар",
            firstName: "нелею",
            middleName: "степанівною"
        },
        locative: {
            lastName: "бровар",
            firstName: "нелі",
            middleName: "степанівні"
        },
        vocative: {
            lastName: "бровар",
            firstName: "нелю",
            middleName: "степанівно"
        }
    };

    testInflections(person, validResults);

});
