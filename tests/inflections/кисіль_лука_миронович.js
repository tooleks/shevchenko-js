const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "кисіль",
    firstName: "лука",
    middleName: "миронович"
};

const validResults = {
    nominative: {
        lastName: "кисіль",
        firstName: "лука",
        middleName: "миронович"
    },
    genitive: {
        lastName: "кисіля",
        firstName: "луки",
        middleName: "мироновича"
    },
    dative: {
        lastName: "кисілю",
        firstName: "луці",
        middleName: "мироновичу"
    },
    accusative: {
        lastName: "кисіля",
        firstName: "луку",
        middleName: "мироновича"
    },
    ablative: {
        lastName: "кисілем",
        firstName: "лукою",
        middleName: "мироновичем"
    },
    locative: {
        lastName: "кисілю",
        firstName: "луці",
        middleName: "мироновичу"
    },
    vocative: {
        lastName: "кисілю",
        firstName: "луко",
        middleName: "мироновичу"
    }
};

testInflections(person, validResults);
