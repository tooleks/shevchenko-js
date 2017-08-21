const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "довга",
    firstName: "анфіса",
    middleName: "зорянівна"
};

const validResults = {
    nominative: {
        lastName: "довга",
        firstName: "анфіса",
        middleName: "зорянівна"
    },
    genitive: {
        lastName: "довгої",
        firstName: "анфіси",
        middleName: "зорянівни"
    },
    dative: {
        lastName: "довгій",
        firstName: "анфісі",
        middleName: "зорянівні"
    },
    accusative: {
        lastName: "довгу",
        firstName: "анфісу",
        middleName: "зорянівну"
    },
    ablative: {
        lastName: "довгою",
        firstName: "анфісою",
        middleName: "зорянівною"
    },
    locative: {
        lastName: "довгій",
        firstName: "анфісі",
        middleName: "зорянівні"
    },
    vocative: {
        lastName: "довга",
        firstName: "анфісо",
        middleName: "зорянівно"
    }
};

testInflections(person, validResults);
