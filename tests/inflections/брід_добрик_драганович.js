const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "брід",
    firstName: "добрик",
    middleName: "драганович"
};

const validResults = {
    nominative: {
        lastName: "брід",
        firstName: "добрик",
        middleName: "драганович"
    },
    genitive: {
        lastName: "брода",
        firstName: "добрика",
        middleName: "драгановича"
    },
    dative: {
        lastName: "броду",
        firstName: "добрику",
        middleName: "драгановичу"
    },
    accusative: {
        lastName: "брода",
        firstName: "добрика",
        middleName: "драгановича"
    },
    ablative: {
        lastName: "бродом",
        firstName: "добриком",
        middleName: "драгановичем"
    },
    locative: {
        lastName: "броді",
        firstName: "добрикові",
        middleName: "драгановичу"
    },
    vocative: {
        lastName: "броде",
        firstName: "добрику",
        middleName: "драгановичу"
    }
};

testInflections(person, validResults);
