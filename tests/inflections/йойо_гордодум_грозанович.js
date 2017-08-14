const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "йойо",
    firstName: "гордодум",
    middleName: "грозанович"
};

const validResults = {
    nominative: {
        lastName: "йойо",
        firstName: "гордодум",
        middleName: "грозанович"
    },
    genitive: {
        lastName: "йоя",
        firstName: "гордодума",
        middleName: "грозановича"
    },
    dative: {
        lastName: "йойові",
        firstName: "гордодуму",
        middleName: "грозановичу"
    },
    accusative: {
        lastName: "йоя",
        firstName: "гордодума",
        middleName: "грозановича"
    },
    ablative: {
        lastName: "йойом",
        firstName: "гордодумом",
        middleName: "грозановичем"
    },
    locative: {
        lastName: "йойові",
        firstName: "гордодумові",
        middleName: "грозановичу"
    },
    vocative: {
        lastName: "йойо",
        firstName: "гордодуме",
        middleName: "грозановичу"
    }
};

testInflections(person, validResults);
