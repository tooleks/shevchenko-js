const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "кузик",
    firstName: "андрій",
    middleName: "іванович"
};

const validResults = {
    nominative: {
        lastName: "кузик",
        firstName: "андрій",
        middleName: "іванович"
    },
    genitive: {
        lastName: "кузика",
        firstName: "андрія",
        middleName: "івановича"
    },
    dative: {
        lastName: "кузику",
        firstName: "андрію",
        middleName: "івановичу"
    },
    accusative: {
        lastName: "кузика",
        firstName: "андрія",
        middleName: "івановича"
    },
    ablative: {
        lastName: "кузиком",
        firstName: "андрієм",
        middleName: "івановичем"
    },
    locative: {
        lastName: "кузикові",
        firstName: "андрієві",
        middleName: "івановичу"
    },
    vocative: {
        lastName: "кузику",
        firstName: "андрію",
        middleName: "івановичу"
    }
};

testInflections(person, validResults);
