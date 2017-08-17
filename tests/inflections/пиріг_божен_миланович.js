const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "пиріг",
    firstName: "божен",
    middleName: "миланович"
};

const validResults = {
    nominative: {
        lastName: "пиріг",
        firstName: "божен",
        middleName: "миланович"
    },
    genitive: {
        lastName: "пирога",
        firstName: "божена",
        middleName: "милановича"
    },
    dative: {
        lastName: "пирогу",
        firstName: "божену",
        middleName: "милановичу"
    },
    accusative: {
        lastName: "пирога",
        firstName: "божена",
        middleName: "милановича"
    },
    ablative: {
        lastName: "пирогом",
        firstName: "боженом",
        middleName: "милановичем"
    },
    locative: {
        lastName: "пирозі",
        firstName: "боженові",
        middleName: "милановичу"
    },
    vocative: {
        lastName: "пирогу",
        firstName: "божене",
        middleName: "милановичу"
    }
};

testInflections(person, validResults);
