const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "сивокінь",
    firstName: "слава",
    middleName: "стожарович"
};

const validResults = {
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
