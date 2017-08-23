const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "орел",
    firstName: "анатолій",
    middleName: "діонович"
};

const validResults = {
    nominative: {
        lastName: "орел",
        firstName: "анатолій",
        middleName: "діонович"
    },
    genitive: {
        lastName: "орла",
        firstName: "анатолія",
        middleName: "діоновича"
    },
    dative: {
        lastName: "орлові",
        firstName: "анатолію",
        middleName: "діоновичу"
    },
    accusative: {
        lastName: "орла",
        firstName: "анатолія",
        middleName: "діоновича"
    },
    ablative: {
        lastName: "орлом",
        firstName: "анатолієм",
        middleName: "діоновичем"
    },
    locative: {
        lastName: "орлові",
        firstName: "анатолієві",
        middleName: "діоновичу"
    },
    vocative: {
        lastName: "орле",
        firstName: "анатолію",
        middleName: "діоновичу"
    }
};

testInflections(person, validResults);
