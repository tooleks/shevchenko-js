const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "фітільов",
    firstName: "микола",
    middleName: "григорович"
};

const validResults = {
    nominative: {
        lastName: "фітільов",
        firstName: "микола",
        middleName: "григорович"
    },
    genitive: {
        lastName: "фітільова",
        firstName: "миколи",
        middleName: "григоровича"
    },
    dative: {
        lastName: "фітільову",
        firstName: "миколі",
        middleName: "григоровичу"
    },
    accusative: {
        lastName: "фітільова",
        firstName: "миколу",
        middleName: "григоровича"
    },
    ablative: {
        lastName: "фітільовим",
        firstName: "миколою",
        middleName: "григоровичем"
    },
    locative: {
        lastName: "фітільову",
        firstName: "миколі",
        middleName: "григоровичу"
    },
    vocative: {
        lastName: "фітільове",
        firstName: "миколо",
        middleName: "григоровичу"
    }
};

testInflections(person, validResults);
