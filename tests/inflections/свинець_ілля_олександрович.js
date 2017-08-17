const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "свинець",
    firstName: "ілля",
    middleName: "олександрович"
};

const validResults = {
    nominative: {
        lastName: "свинець",
        firstName: "ілля",
        middleName: "олександрович"
    },
    genitive: {
        lastName: "свинця",
        firstName: "іллі",
        middleName: "олександровича"
    },
    dative: {
        lastName: "свинцю",
        firstName: "іллі",
        middleName: "олександровичу"
    },
    accusative: {
        lastName: "свинця",
        firstName: "іллю",
        middleName: "олександровича"
    },
    ablative: {
        lastName: "свинцем",
        firstName: "іллею",
        middleName: "олександровичем"
    },
    locative: {
        lastName: "свинцю",
        firstName: "іллі",
        middleName: "олександровичу"
    },
    vocative: {
        lastName: "свинцю",
        firstName: "ілле",
        middleName: "олександровичу"
    }
};

testInflections(person, validResults);
