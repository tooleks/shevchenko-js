const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "симоненко",
    firstName: "василь",
    middleName: "андрійович"
};

const validResults = {
    nominative: {
        lastName: "симоненко",
        firstName: "василь",
        middleName: "андрійович"
    },
    genitive: {
        lastName: "симоненка",
        firstName: "василя",
        middleName: "андрійовича"
    },
    dative: {
        lastName: "симоненку",
        firstName: "василю",
        middleName: "андрійовичу"
    },
    accusative: {
        lastName: "симоненка",
        firstName: "василя",
        middleName: "андрійовича"
    },
    ablative: {
        lastName: "симоненком",
        firstName: "василем",
        middleName: "андрійовичем"
    },
    locative: {
        lastName: "симоненкові",
        firstName: "василеві",
        middleName: "андрійовичу"
    },
    vocative: {
        lastName: "симоненку",
        firstName: "василю",
        middleName: "андрійовичу"
    }
};

testInflections(person, validResults);
