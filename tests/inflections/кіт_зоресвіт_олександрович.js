const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "кіт",
    firstName: "зоресвіт",
    middleName: "олександрович"
};

const validResults = {
    nominative: {
        lastName: "кіт",
        firstName: "зоресвіт",
        middleName: "олександрович"
    },
    genitive: {
        lastName: "кота",
        firstName: "зоресвіта",
        middleName: "олександровича"
    },
    dative: {
        lastName: "коту",
        firstName: "зоресвіту",
        middleName: "олександровичу"
    },
    accusative: {
        lastName: "кота",
        firstName: "зоресвіта",
        middleName: "олександровича"
    },
    ablative: {
        lastName: "котом",
        firstName: "зоресвітом",
        middleName: "олександровичем"
    },
    locative: {
        lastName: "коті",
        firstName: "зоресвітові",
        middleName: "олександровичу"
    },
    vocative: {
        lastName: "коте",
        firstName: "зоресвіте",
        middleName: "олександровичу"
    }
};

testInflections(person, validResults);
