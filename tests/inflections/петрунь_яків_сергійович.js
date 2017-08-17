const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "петрунь",
    firstName: "яків",
    middleName: "сергійович"
};

const validResults = {
    nominative: {
        lastName: "петрунь",
        firstName: "яків",
        middleName: "сергійович"
    },
    genitive: {
        lastName: "петруня",
        firstName: "якова",
        middleName: "сергійовича"
    },
    dative: {
        lastName: "петруню",
        firstName: "якову",
        middleName: "сергійовичу"
    },
    accusative: {
        lastName: "петруня",
        firstName: "якова",
        middleName: "сергійовича"
    },
    ablative: {
        lastName: "петрунем",
        firstName: "яковом",
        middleName: "сергійовичем"
    },
    locative: {
        lastName: "петруневі",
        firstName: "якові",
        middleName: "сергійовичу"
    },
    vocative: {
        lastName: "петруню",
        firstName: "якове",
        middleName: "сергійовичу"
    }
};

testInflections(person, validResults);
