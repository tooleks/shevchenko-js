const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "кузьо",
    firstName: "таня",
    middleName: "григорівна"
};

const validResults = {
    nominative: {
        lastName: "кузьо",
        firstName: "таня",
        middleName: "григорівна"
    },
    genitive: {
        lastName: "кузьо",
        firstName: "тані",
        middleName: "григорівни"
    },
    dative: {
        lastName: "кузьо",
        firstName: "тані",
        middleName: "григорівні"
    },
    accusative: {
        lastName: "кузьо",
        firstName: "таню",
        middleName: "григорівну"
    },
    ablative: {
        lastName: "кузьо",
        firstName: "танею",
        middleName: "григорівною"
    },
    locative: {
        lastName: "кузьо",
        firstName: "тані",
        middleName: "григорівні"
    },
    vocative: {
        lastName: "кузьо",
        firstName: "таню",
        middleName: "григорівно"
    }
};

testInflections(person, validResults);
