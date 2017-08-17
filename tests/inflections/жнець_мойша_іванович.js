const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "жнець",
    firstName: "мойша",
    middleName: "іванович"
};

const validResults = {
    nominative: {
        lastName: "жнець",
        firstName: "мойша",
        middleName: "іванович"
    },
    genitive: {
        lastName: "жнеця",
        firstName: "мойші",
        middleName: "івановича"
    },
    dative: {
        lastName: "жнецю",
        firstName: "мойші",
        middleName: "івановичу"
    },
    accusative: {
        lastName: "жнеця",
        firstName: "мойшу",
        middleName: "івановича"
    },
    ablative: {
        lastName: "жнецем",
        firstName: "мойшею",
        middleName: "івановичем"
    },
    locative: {
        lastName: "жнецю",
        firstName: "мойші",
        middleName: "івановичу"
    },
    vocative: {
        lastName: "жнецю",
        firstName: "мойшо",
        middleName: "івановичу"
    }
};

testInflections(person, validResults);
