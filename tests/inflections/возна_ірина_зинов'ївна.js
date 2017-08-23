const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "возна",
    firstName: "ірина",
    middleName: "зинов'ївна"
};

const validResults = {
    nominative: {
        lastName: "возна",
        firstName: "ірина",
        middleName: "зинов'ївна"
    },
    genitive: {
        lastName: "возної",
        firstName: "ірини",
        middleName: "зинов'ївни"
    },
    dative: {
        lastName: "возній",
        firstName: "ірині",
        middleName: "зинов'ївні"
    },
    accusative: {
        lastName: "возну",
        firstName: "ірину",
        middleName: "зинов'ївну"
    },
    ablative: {
        lastName: "возною",
        firstName: "іриною",
        middleName: "зинов'ївною"
    },
    locative: {
        lastName: "возній",
        firstName: "ірині",
        middleName: "зинов'ївні"
    },
    vocative: {
        lastName: "возна",
        firstName: "ірино",
        middleName: "зинов'ївно"
    }
};

testInflections(person, validResults);
