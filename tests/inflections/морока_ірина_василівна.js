const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "морока",
    firstName: "ірина",
    middleName: "василівна"
};

const validResults = {
    nominative: {
        lastName: "морока",
        firstName: "ірина",
        middleName: "василівна"
    },
    genitive: {
        lastName: "мороки",
        firstName: "ірини",
        middleName: "василівни"
    },
    dative: {
        lastName: "мороці",
        firstName: "ірині",
        middleName: "василівні"
    },
    accusative: {
        lastName: "мороку",
        firstName: "ірину",
        middleName: "василівну"
    },
    ablative: {
        lastName: "морокою",
        firstName: "іриною",
        middleName: "василівною"
    },
    locative: {
        lastName: "мороці",
        firstName: "ірині",
        middleName: "василівні"
    },
    vocative: {
        lastName: "мороко",
        firstName: "ірино",
        middleName: "василівно"
    }
};

testInflections(person, validResults);
