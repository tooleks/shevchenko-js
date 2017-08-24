const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "черства",
    firstName: "василина",
    middleName: "ігнатівна"
};

const validResults = {
    nominative: {
        lastName: "черства",
        firstName: "василина",
        middleName: "ігнатівна"
    },
    genitive: {
        lastName: "черствої",
        firstName: "василини",
        middleName: "ігнатівни"
    },
    dative: {
        lastName: "черствій",
        firstName: "василині",
        middleName: "ігнатівні"
    },
    accusative: {
        lastName: "черству",
        firstName: "василину",
        middleName: "ігнатівну"
    },
    ablative: {
        lastName: "черствою",
        firstName: "василиною",
        middleName: "ігнатівною"
    },
    locative: {
        lastName: "черствій",
        firstName: "василині",
        middleName: "ігнатівні"
    },
    vocative: {
        lastName: "черства",
        firstName: "василино",
        middleName: "ігнатівно"
    }
};

testInflections(person, validResults);
