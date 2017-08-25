const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "рудченко",
    firstName: "іван",
    middleName: "якович"
};

const validResults = {
    nominative: {
        lastName: "рудченко",
        firstName: "іван",
        middleName: "якович"
    },
    genitive: {
        lastName: "рудченка",
        firstName: "івана",
        middleName: "яковича"
    },
    dative: {
        lastName: "рудченку",
        firstName: "івану",
        middleName: "яковичу"
    },
    accusative: {
        lastName: "рудченка",
        firstName: "івана",
        middleName: "яковича"
    },
    ablative: {
        lastName: "рудченком",
        firstName: "іваном",
        middleName: "яковичем"
    },
    locative: {
        lastName: "рудченкові",
        firstName: "іванові",
        middleName: "яковичу"
    },
    vocative: {
        lastName: "рудченку",
        firstName: "іване",
        middleName: "яковичу"
    }
};

testInflections(person, validResults);
