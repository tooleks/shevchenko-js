const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "ковалів",
    firstName: "семен",
    middleName: "ігорович"
};

const validResults = {
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
