const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "петренко",
    firstName: "петро",
    middleName: "петрович"
};

const validResults = {
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
