const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "кошель",
    firstName: "мусій",
    middleName: "надійович"
};

const validResults = {
    nominative: {
        lastName: "кошель",
        firstName: "мусій",
        middleName: "надійович"
    },
    genitive: {
        lastName: "кошеля",
        firstName: "мусія",
        middleName: "надійовича"
    },
    dative: {
        lastName: "кошелю",
        firstName: "мусію",
        middleName: "надійовичу"
    },
    accusative: {
        lastName: "кошеля",
        firstName: "мусія",
        middleName: "надійовича"
    },
    ablative: {
        lastName: "кошелем",
        firstName: "мусієм",
        middleName: "надійовичем"
    },
    locative: {
        lastName: "кошелеві",
        firstName: "мусієві",
        middleName: "надійовичу"
    },
    vocative: {
        lastName: "кошелю",
        firstName: "мусію",
        middleName: "надійовичу"
    }
};

testInflections(person, validResults);
