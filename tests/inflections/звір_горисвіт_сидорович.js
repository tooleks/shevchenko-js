const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "звір",
    firstName: "горисвіт",
    middleName: "сидорович"
};

const validResults = {
    nominative: {
        lastName: "звір",
        firstName: "горисвіт",
        middleName: "сидорович"
    },
    genitive: {
        lastName: "звіра",
        firstName: "горисвіта",
        middleName: "сидоровича"
    },
    dative: {
        lastName: "звіру",
        firstName: "горисвіту",
        middleName: "сидоровичу"
    },
    accusative: {
        lastName: "звіра",
        firstName: "горисвіта",
        middleName: "сидоровича"
    },
    ablative: {
        lastName: "звіром",
        firstName: "горисвітом",
        middleName: "сидоровичем"
    },
    locative: {
        lastName: "звірові",
        firstName: "горисвітові",
        middleName: "сидоровичу"
    },
    vocative: {
        lastName: "звіре",
        firstName: "горисвіте",
        middleName: "сидоровичу"
    }
};

testInflections(person, validResults);
