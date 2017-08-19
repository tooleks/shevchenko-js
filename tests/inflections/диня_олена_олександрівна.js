const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "диня",
    firstName: "олена",
    middleName: "олександрівна"
};

const validResults = {
    nominative: {
        lastName: "диня",
        firstName: "олена",
        middleName: "олександрівна"
    },
    genitive: {
        lastName: "дині",
        firstName: "олени",
        middleName: "олександрівни"
    },
    dative: {
        lastName: "дині",
        firstName: "олені",
        middleName: "олександрівні"
    },
    accusative: {
        lastName: "диню",
        firstName: "олену",
        middleName: "олександрівну"
    },
    ablative: {
        lastName: "динею",
        firstName: "оленою",
        middleName: "олександрівною"
    },
    locative: {
        lastName: "дині",
        firstName: "олені",
        middleName: "олександрівні"
    },
    vocative: {
        lastName: "дине",
        firstName: "олено",
        middleName: "олександрівно"
    }
};

testInflections(person, validResults);
