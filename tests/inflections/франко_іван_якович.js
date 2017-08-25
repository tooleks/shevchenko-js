const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "франко",
    firstName: "іван",
    middleName: "якович"
};

const validResults = {
    nominative: {
        lastName: "франко",
        firstName: "іван",
        middleName: "якович"
    },
    genitive: {
        lastName: "франка",
        firstName: "івана",
        middleName: "яковича"
    },
    dative: {
        lastName: "франку",
        firstName: "івану",
        middleName: "яковичу"
    },
    accusative: {
        lastName: "франка",
        firstName: "івана",
        middleName: "яковича"
    },
    ablative: {
        lastName: "франком",
        firstName: "іваном",
        middleName: "яковичем"
    },
    locative: {
        lastName: "франкові",
        firstName: "іванові",
        middleName: "яковичу"
    },
    vocative: {
        lastName: "франку",
        firstName: "іване",
        middleName: "яковичу"
    }
};

testInflections(person, validResults);
