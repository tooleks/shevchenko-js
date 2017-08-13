const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "сіль",
    firstName: "йохим",
    middleName: "миронович"
};

const validResults = {
    nominative: {
        lastName: "сіль",
        firstName: "йохим",
        middleName: "миронович"
    },
    genitive: {
        lastName: "солі",
        firstName: "йохима",
        middleName: "мироновича"
    },
    dative: {
        lastName: "солі",
        firstName: "йохиму",
        middleName: "мироновичу"
    },
    accusative: {
        lastName: "сіль",
        firstName: "йохима",
        middleName: "мироновича"
    },
    ablative: {
        lastName: "сіллю",
        firstName: "йохимом",
        middleName: "мироновичем"
    },
    locative: {
        lastName: "солі",
        firstName: "йохимові",
        middleName: "мироновичу"
    },
    vocative: {
        lastName: "соле",
        firstName: "йохиме",
        middleName: "мироновичу"
    }
};

testInflections(person, validResults);
