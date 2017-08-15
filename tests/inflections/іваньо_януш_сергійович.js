const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "іваньо",
    firstName: "януш",
    middleName: "сергійович"
};

const validResults = {
    nominative: {
        lastName: "іваньо",
        firstName: "януш",
        middleName: "сергійович"
    },
    genitive: {
        lastName: "іваня",
        firstName: "януша",
        middleName: "сергійовича"
    },
    dative: {
        lastName: "іваню",
        firstName: "янушу",
        middleName: "сергійовичу"
    },
    accusative: {
        lastName: "іваня",
        firstName: "януша",
        middleName: "сергійовича"
    },
    ablative: {
        lastName: "іваньом",
        firstName: "янушем",
        middleName: "сергійовичем"
    },
    locative: {
        lastName: "іваню",
        firstName: "янушеві",
        middleName: "сергійовичу"
    },
    vocative: {
        lastName: "іваньо",
        firstName: "януше",
        middleName: "сергійовичу"
    }
};

testInflections(person, validResults);
