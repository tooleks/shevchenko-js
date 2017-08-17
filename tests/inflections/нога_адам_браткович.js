const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "нога",
    firstName: "адам",
    middleName: "браткович"
};

const validResults = {
    nominative: {
        lastName: "нога",
        firstName: "адам",
        middleName: "браткович"
    },
    genitive: {
        lastName: "ноги",
        firstName: "адама",
        middleName: "братковича"
    },
    dative: {
        lastName: "нозі",
        firstName: "адаму",
        middleName: "братковичу"
    },
    accusative: {
        lastName: "ногу",
        firstName: "адама",
        middleName: "братковича"
    },
    ablative: {
        lastName: "ногою",
        firstName: "адамом",
        middleName: "братковичем"
    },
    locative: {
        lastName: "нозі",
        firstName: "адамові",
        middleName: "братковичу"
    },
    vocative: {
        lastName: "ного",
        firstName: "адаме",
        middleName: "братковичу"
    }
};

testInflections(person, validResults);
