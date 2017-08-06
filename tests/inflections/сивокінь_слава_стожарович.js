var assert = require("assert");
var testInflections = require("../helpers").testInflections;

var person = {
    gender: "male",
    lastName: "сивокінь",
    firstName: "слава",
    middleName: "стожарович"
};

var validResults = {
    nominative: {
        lastName: "сивокінь",
        firstName: "слава",
        middleName: "стожарович"
    },
    genitive: {
        lastName: "сивоконя",
        firstName: "слави",
        middleName: "стожаровича"
    },
    dative: {
        lastName: "сивоконю",
        firstName: "славі",
        middleName: "стожаровичу"
    },
    accusative: {
        lastName: "сивоконя",
        firstName: "славу",
        middleName: "стожаровича"
    },
    ablative: {
        lastName: "сивоконем",
        firstName: "славою",
        middleName: "стожаровичем"
    },
    locative: {
        lastName: "сивоконі",
        firstName: "славі",
        middleName: "стожаровичу"
    },
    vocative: {
        lastName: "сивоконю",
        firstName: "славо",
        middleName: "стожаровичу"
    }
};

testInflections(person, validResults);
