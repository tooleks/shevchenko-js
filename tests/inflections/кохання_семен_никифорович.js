const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "кохання",
    firstName: "семен",
    middleName: "никифорович"
};

const validResults = {
    nominative: {
        lastName: "кохання",
        firstName: "семен",
        middleName: "никифорович"
    },
    genitive: {
        lastName: "кохання",
        firstName: "семена",
        middleName: "никифоровича"
    },
    dative: {
        lastName: "коханню",
        firstName: "семену",
        middleName: "никифоровичу"
    },
    accusative: {
        lastName: "кохання",
        firstName: "семена",
        middleName: "никифоровича"
    },
    ablative: {
        lastName: "коханням",
        firstName: "семеном",
        middleName: "никифоровичем"
    },
    locative: {
        lastName: "коханні",
        firstName: "семенові",
        middleName: "никифоровичу"
    },
    vocative: {
        lastName: "кохання",
        firstName: "семене",
        middleName: "никифоровичу"
    }
};

testInflections(person, validResults);
