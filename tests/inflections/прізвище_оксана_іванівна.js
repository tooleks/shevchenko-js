const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "female",
    lastName: "прізвище",
    firstName: "оксана",
    middleName: "іванівна"
};

const validResults = {
    nominative: {
        lastName: "прізвище",
        firstName: "оксана",
        middleName: "іванівна"
    },
    genitive: {
        lastName: "прізвища",
        firstName: "оксани",
        middleName: "іванівни"
    },
    dative: {
        lastName: "прізвищу",
        firstName: "оксані",
        middleName: "іванівні"
    },
    accusative: {
        lastName: "прізвище",
        firstName: "оксану",
        middleName: "іванівну"
    },
    ablative: {
        lastName: "прізвищем",
        firstName: "оксаною",
        middleName: "іванівною"
    },
    locative: {
        lastName: "прізвищі",
        firstName: "оксані",
        middleName: "іванівні"
    },
    vocative: {
        lastName: "прізвище",
        firstName: "оксано",
        middleName: "іванівно"
    }
};

testInflections(person, validResults);
