const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "прилука",
    firstName: "жанна",
    middleName: "павлівна"
};

const validResults = {
    nominative: {
        lastName: "прилука",
        firstName: "жанна",
        middleName: "павлівна"
    },
    genitive: {
        lastName: "прилуки",
        firstName: "жанни",
        middleName: "павлівни"
    },
    dative: {
        lastName: "прилуці",
        firstName: "жанні",
        middleName: "павлівні"
    },
    accusative: {
        lastName: "прилуку",
        firstName: "жанну",
        middleName: "павлівну"
    },
    ablative: {
        lastName: "прилукою",
        firstName: "жанною",
        middleName: "павлівною"
    },
    locative: {
        lastName: "прилуці",
        firstName: "жанні",
        middleName: "павлівні"
    },
    vocative: {
        lastName: "прилуко",
        firstName: "жанно",
        middleName: "павлівно"
    }
};

testInflections(person, validResults);
