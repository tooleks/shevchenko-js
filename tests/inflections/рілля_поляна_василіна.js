const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "рілля",
    firstName: "поляна",
    middleName: "василівна"
};

const validResults = {
    nominative: {
        lastName: "рілля",
        firstName: "поляна",
        middleName: "василівна"
    },
    genitive: {
        lastName: "ріллі",
        firstName: "поляни",
        middleName: "василівни"
    },
    dative: {
        lastName: "ріллі",
        firstName: "поляні",
        middleName: "василівні"
    },
    accusative: {
        lastName: "ріллю",
        firstName: "поляну",
        middleName: "василівну"
    },
    ablative: {
        lastName: "ріллею",
        firstName: "поляною",
        middleName: "василівною"
    },
    locative: {
        lastName: "ріллі",
        firstName: "поляні",
        middleName: "василівні"
    },
    vocative: {
        lastName: "рілле",
        firstName: "поляно",
        middleName: "василівно"
    }
};

testInflections(person, validResults);
