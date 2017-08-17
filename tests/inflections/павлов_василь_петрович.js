const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "павлов",
    firstName: "василь",
    middleName: "петрович"
};

const validResults = {
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
