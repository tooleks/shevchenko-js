const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "глібов",
    firstName: "леонід",
    middleName: "іванович"
};

const validResults = {
    nominative: {
        lastName: "глібов",
        firstName: "леонід",
        middleName: "іванович"
    },
    genitive: {
        lastName: "глібова",
        firstName: "леоніда",
        middleName: "івановича"
    },
    dative: {
        lastName: "глібову",
        firstName: "леоніду",
        middleName: "івановичу"
    },
    accusative: {
        lastName: "глібова",
        firstName: "леоніда",
        middleName: "івановича"
    },
    ablative: {
        lastName: "глібовим",
        firstName: "леонідом",
        middleName: "івановичем"
    },
    locative: {
        lastName: "глібову",
        firstName: "леонідові",
        middleName: "івановичу"
    },
    vocative: {
        lastName: "глібове",
        firstName: "леоніде",
        middleName: "івановичу"
    }
};

testInflections(person, validResults);
