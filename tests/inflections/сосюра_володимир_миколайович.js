const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "сосюра",
    firstName: "володимир",
    middleName: "миколайович"
};

const validResults = {
    nominative: {
        lastName: "сосюра",
        firstName: "володимир",
        middleName: "миколайович"
    },
    genitive: {
        lastName: "сосюри",
        firstName: "володимира",
        middleName: "миколайовича"
    },
    dative: {
        lastName: "сосюрі",
        firstName: "володимиру",
        middleName: "миколайовичу"
    },
    accusative: {
        lastName: "сосюру",
        firstName: "володимира",
        middleName: "миколайовича"
    },
    ablative: {
        lastName: "сосюрою",
        firstName: "володимиром",
        middleName: "миколайовичем"
    },
    locative: {
        lastName: "сосюрі",
        firstName: "володимирові",
        middleName: "миколайовичу"
    },
    vocative: {
        lastName: "сосюро",
        firstName: "володимире",
        middleName: "миколайовичу"
    }
};

testInflections(person, validResults);
