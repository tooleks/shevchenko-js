const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "синя",
    firstName: "варвара",
    middleName: "ігорівна"
};

const validResults = {
    nominative: {
        lastName: "синя",
        firstName: "варвара",
        middleName: "ігорівна"
    },
    genitive: {
        lastName: "синьої",
        firstName: "варвари",
        middleName: "ігорівни"
    },
    dative: {
        lastName: "синій",
        firstName: "варварі",
        middleName: "ігорівні"
    },
    accusative: {
        lastName: "синю",
        firstName: "варвару",
        middleName: "ігорівну"
    },
    ablative: {
        lastName: "синьою",
        firstName: "варварою",
        middleName: "ігорівною"
    },
    locative: {
        lastName: "синій",
        firstName: "варварі",
        middleName: "ігорівні"
    },
    vocative: {
        lastName: "синя",
        firstName: "варваро",
        middleName: "ігорівно"
    }
};

testInflections(person, validResults);
