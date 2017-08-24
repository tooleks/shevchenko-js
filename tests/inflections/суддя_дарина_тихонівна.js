const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "суддя",
    firstName: "дарина",
    middleName: "тихонівна"
};

const validResults = {
    nominative: {
        lastName: "суддя",
        firstName: "дарина",
        middleName: "тихонівна"
    },
    genitive: {
        lastName: "судді",
        firstName: "дарини",
        middleName: "тихонівни"
    },
    dative: {
        lastName: "судді",
        firstName: "дарині",
        middleName: "тихонівні"
    },
    accusative: {
        lastName: "суддю",
        firstName: "дарину",
        middleName: "тихонівну"
    },
    ablative: {
        lastName: "суддею",
        firstName: "дариною",
        middleName: "тихонівною"
    },
    locative: {
        lastName: "судді",
        firstName: "дарині",
        middleName: "тихонівні"
    },
    vocative: {
        lastName: "судде",
        firstName: "дарино",
        middleName: "тихонівно"
    }
};

testInflections(person, validResults);
