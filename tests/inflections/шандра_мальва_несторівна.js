const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "шандра",
    firstName: "мальва",
    middleName: "несторівна"
};

const validResults = {
    nominative: {
        lastName: "шандра",
        firstName: "мальва",
        middleName: "несторівна"
    },
    genitive: {
        lastName: "шандри",
        firstName: "мальви",
        middleName: "несторівни"
    },
    dative: {
        lastName: "шандрі",
        firstName: "мальві",
        middleName: "несторівні"
    },
    accusative: {
        lastName: "шандру",
        firstName: "мальву",
        middleName: "несторівну"
    },
    ablative: {
        lastName: "шандрою",
        firstName: "мальвою",
        middleName: "несторівною"
    },
    locative: {
        lastName: "шандрі",
        firstName: "мальві",
        middleName: "несторівні"
    },
    vocative: {
        lastName: "шандро",
        firstName: "мальво",
        middleName: "несторівно"
    }
};

testInflections(person, validResults);
