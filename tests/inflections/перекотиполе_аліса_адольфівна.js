const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "перекотиполе",
    firstName: "аліса",
    middleName: "адольфівна"
};

const validResults = {
    nominative: {
        lastName: "перекотиполе",
        firstName: "аліса",
        middleName: "адольфівна"
    },
    genitive: {
        lastName: "перекотиполя",
        firstName: "аліси",
        middleName: "адольфівни"
    },
    dative: {
        lastName: "перекотиполю",
        firstName: "алісі",
        middleName: "адольфівні"
    },
    accusative: {
        lastName: "перекотиполе",
        firstName: "алісу",
        middleName: "адольфівну"
    },
    ablative: {
        lastName: "перекотиполем",
        firstName: "алісою",
        middleName: "адольфівною"
    },
    locative: {
        lastName: "перекотиполі",
        firstName: "алісі",
        middleName: "адольфівні"
    },
    vocative: {
        lastName: "перекотиполе",
        firstName: "алісо",
        middleName: "адольфівно"
    }
};

testInflections(person, validResults);
