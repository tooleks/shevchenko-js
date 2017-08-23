const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "сутула",
    firstName: "леся",
    middleName: "леонідівна"
};

const validResults = {
    nominative: {
        lastName: "сутула",
        firstName: "леся",
        middleName: "леонідівна"
    },
    genitive: {
        lastName: "сутулої",
        firstName: "лесі",
        middleName: "леонідівни"
    },
    dative: {
        lastName: "сутулій",
        firstName: "лесі",
        middleName: "леонідівні"
    },
    accusative: {
        lastName: "сутулу",
        firstName: "лесю",
        middleName: "леонідівну"
    },
    ablative: {
        lastName: "сутулою",
        firstName: "лесею",
        middleName: "леонідівною"
    },
    locative: {
        lastName: "сутулій",
        firstName: "лесі",
        middleName: "леонідівні"
    },
    vocative: {
        lastName: "сутула",
        firstName: "лесю",
        middleName: "леонідівно"
    }
};

testInflections(person, validResults);
