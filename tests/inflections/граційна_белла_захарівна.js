const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "граційна",
    firstName: "белла",
    middleName: "захарівна"
};

const validResults = {
    nominative: {
        lastName: "граційна",
        firstName: "белла",
        middleName: "захарівна"
    },
    genitive: {
        lastName: "граційної",
        firstName: "белли",
        middleName: "захарівни"
    },
    dative: {
        lastName: "граційній",
        firstName: "беллі",
        middleName: "захарівні"
    },
    accusative: {
        lastName: "граційну",
        firstName: "беллу",
        middleName: "захарівну"
    },
    ablative: {
        lastName: "граційною",
        firstName: "беллою",
        middleName: "захарівною"
    },
    locative: {
        lastName: "граційній",
        firstName: "беллі",
        middleName: "захарівні"
    },
    vocative: {
        lastName: "граційна",
        firstName: "белло",
        middleName: "захарівно"
    }
};

testInflections(person, validResults);
