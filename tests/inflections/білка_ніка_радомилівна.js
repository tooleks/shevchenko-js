const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "білка",
    firstName: "ніка",
    middleName: "радомилівна"
};

const validResults = {
    nominative: {
        lastName: "білка",
        firstName: "ніка",
        middleName: "радомилівна"
    },
    genitive: {
        lastName: "білки",
        firstName: "ніки",
        middleName: "радомилівни"
    },
    dative: {
        lastName: "білці",
        firstName: "ніці",
        middleName: "радомилівні"
    },
    accusative: {
        lastName: "білку",
        firstName: "ніку",
        middleName: "радомилівну"
    },
    ablative: {
        lastName: "білкою",
        firstName: "нікою",
        middleName: "радомилівною"
    },
    locative: {
        lastName: "білці",
        firstName: "ніці",
        middleName: "радомилівні"
    },
    vocative: {
        lastName: "білко",
        firstName: "ніко",
        middleName: "радомилівно"
    }
};

testInflections(person, validResults);
