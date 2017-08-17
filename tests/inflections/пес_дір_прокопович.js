const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "пес",
    firstName: "дір",
    middleName: "прокопович"
};

const validResults = {
    nominative: {
        lastName: "пес",
        firstName: "дір",
        middleName: "прокопович"
    },
    genitive: {
        lastName: "пса",
        firstName: "діра",
        middleName: "прокоповича"
    },
    dative: {
        lastName: "псу",
        firstName: "діру",
        middleName: "прокоповичу"
    },
    accusative: {
        lastName: "пса",
        firstName: "діра",
        middleName: "прокоповича"
    },
    ablative: {
        lastName: "псом",
        firstName: "діром",
        middleName: "прокоповичем"
    },
    locative: {
        lastName: "псові",
        firstName: "дірові",
        middleName: "прокоповичу"
    },
    vocative: {
        lastName: "псе",
        firstName: "діре",
        middleName: "прокоповичу"
    }
};

testInflections(person, validResults);
