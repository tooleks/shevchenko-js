var assert = require("assert");
var testInflections = require("../helpers").testInflections;

var person = {
    gender: "male",
    lastName: "павлов",
    firstName: "василь",
    middleName: "петрович"
};

var validResults = {
    nominative: {
        lastName: "павлов",
        firstName: "василь",
        middleName: "петрович"
    },
    genitive: {
        lastName: "павлова",
        firstName: "василя",
        middleName: "петровича"
    },
    dative: {
        lastName: "павлову",
        firstName: "василю",
        middleName: "петровичу"
    },
    accusative: {
        lastName: "павлова",
        firstName: "василя",
        middleName: "петровича"
    },
    ablative: {
        lastName: "павловим",
        firstName: "василем",
        middleName: "петровичем"
    },
    locative: {
        lastName: "павлову",
        firstName: "василеві",
        middleName: "петровичу"
    },
    vocative: {
        lastName: "павлове",
        firstName: "василю",
        middleName: "петровичу"
    }
};

testInflections(person, validResults);
