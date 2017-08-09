var assert = require("assert");
var testInflections = require("../helpers").testInflections;

var person = {
    gender: "female",
    lastName: "прізвище",
    firstName: "оксана",
    middleName: "іванівна"
};

var validResults = {
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
