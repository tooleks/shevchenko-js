const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "маленька",
    firstName: "антоніна",
    middleName: "петрівна"
};

const validResults = {
    nominative: {
        lastName: "маленька",
        firstName: "антоніна",
        middleName: "петрівна"
    },
    genitive: {
        lastName: "маленької",
        firstName: "антоніни",
        middleName: "петрівни"
    },
    dative: {
        lastName: "маленькій",
        firstName: "антоніні",
        middleName: "петрівні"
    },
    accusative: {
        lastName: "маленьку",
        firstName: "антоніну",
        middleName: "петрівну"
    },
    ablative: {
        lastName: "маленькою",
        firstName: "антоніною",
        middleName: "петрівною"
    },
    locative: {
        lastName: "маленькій",
        firstName: "антоніні",
        middleName: "петрівні"
    },
    vocative: {
        lastName: "маленька",
        firstName: "антоніно",
        middleName: "петрівно"
    }
};

testInflections(person, validResults);
