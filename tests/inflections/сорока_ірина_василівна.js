const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "сорока",
    firstName: "ірина",
    middleName: "василівна"
};

const validResults = {
    nominative: {
        lastName: "сорока",
        firstName: "ірина",
        middleName: "василівна"
    },
    genitive: {
        lastName: "сороки",
        firstName: "ірини",
        middleName: "василівни"
    },
    dative: {
        lastName: "сороці",
        firstName: "ірині",
        middleName: "василівні"
    },
    accusative: {
        lastName: "сороку",
        firstName: "ірину",
        middleName: "василівну"
    },
    ablative: {
        lastName: "сорокою",
        firstName: "іриною",
        middleName: "василівною"
    },
    locative: {
        lastName: "сороці",
        firstName: "ірині",
        middleName: "василівні"
    },
    vocative: {
        lastName: "сороко",
        firstName: "ірино",
        middleName: "василівно"
    }
};

testInflections(person, validResults);
