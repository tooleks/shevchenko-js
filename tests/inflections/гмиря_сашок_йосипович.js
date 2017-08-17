const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "гмиря",
    firstName: "сашок",
    middleName: "йосипович"
};

const validResults = {
    nominative: {
        lastName: "гмиря",
        firstName: "сашок",
        middleName: "йосипович"
    },
    genitive: {
        lastName: "гмирі",
        firstName: "сашка",
        middleName: "йосиповича"
    },
    dative: {
        lastName: "гмирі",
        firstName: "сашку",
        middleName: "йосиповичу"
    },
    accusative: {
        lastName: "гмирю",
        firstName: "сашка",
        middleName: "йосиповича"
    },
    ablative: {
        lastName: "гмирею",
        firstName: "сашком",
        middleName: "йосиповичем"
    },
    locative: {
        lastName: "гмирі",
        firstName: "сашкові",
        middleName: "йосиповичу"
    },
    vocative: {
        lastName: "гмире",
        firstName: "сашку",
        middleName: "йосиповичу"
    }
};

testInflections(person, validResults);
