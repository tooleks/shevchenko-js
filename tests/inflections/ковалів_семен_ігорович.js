var assert = require("assert");
var testInflections = require("../helpers").testInflections;

var person = {
    gender: "male",
    lastName: "ковалів",
    firstName: "семен",
    middleName: "ігорович"
};

var validResults = {
    nominative: {
        lastName: "ковалів",
        firstName: "семен",
        middleName: "ігорович"
    },
    genitive: {
        lastName: "коваліва",
        firstName: "семена",
        middleName: "ігоровича"
    },
    dative: {
        lastName: "коваліву",
        firstName: "семену",
        middleName: "ігоровичу"
    },
    accusative: {
        lastName: "коваліва",
        firstName: "семена",
        middleName: "ігоровича"
    },
    ablative: {
        lastName: "ковалівим",
        firstName: "семеном",
        middleName: "ігоровичем"
    },
    locative: {
        lastName: "коваліву",
        firstName: "семенові",
        middleName: "ігоровичу"
    },
    vocative: {
        lastName: "коваліве",
        firstName: "семене",
        middleName: "ігоровичу"
    }
};

testInflections(person, validResults);
