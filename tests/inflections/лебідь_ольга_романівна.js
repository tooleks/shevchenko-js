var assert = require("assert");
var testInflections = require("../helpers").testInflections;

var person = {
    gender: "female",
    lastName: "лебідь",
    firstName: "ольга",
    middleName: "романівна"
};

var validResults = {
    nominative: {
        lastName: "лебідь",
        firstName: "ольга",
        middleName: "романівна"
    },
    genitive: {
        lastName: "лебідь",
        firstName: "ольги",
        middleName: "романівни"
    },
    dative: {
        lastName: "лебідь",
        firstName: "ользі",
        middleName: "романівні"
    },
    accusative: {
        lastName: "лебідь",
        firstName: "ольгу",
        middleName: "романівну"
    },
    ablative: {
        lastName: "лебідь",
        firstName: "ольгою",
        middleName: "романівною"
    },
    locative: {
        lastName: "лебідь",
        firstName: "ользі",
        middleName: "романівні"
    },
    vocative: {
        lastName: "лебідь",
        firstName: "ольго",
        middleName: "романівно"
    }
};

testInflections(person, validResults);
