const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "тичина",
    firstName: "павло",
    middleName: "григорович"
};

const validResults = {
    nominative: {
        lastName: "тичина",
        firstName: "павло",
        middleName: "григорович"
    },
    genitive: {
        lastName: "тичини",
        firstName: "павла",
        middleName: "григоровича"
    },
    dative: {
        lastName: "тичині",
        firstName: "павлу",
        middleName: "григоровичу"
    },
    accusative: {
        lastName: "тичину",
        firstName: "павла",
        middleName: "григоровича"
    },
    ablative: {
        lastName: "тичиною",
        firstName: "павлом",
        middleName: "григоровичем"
    },
    locative: {
        lastName: "тичині",
        firstName: "павлові",
        middleName: "григоровичу"
    },
    vocative: {
        lastName: "тичино",
        firstName: "павле",
        middleName: "григоровичу"
    }
};

testInflections(person, validResults);
