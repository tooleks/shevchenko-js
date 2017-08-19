const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "зелена",
    firstName: "анна",
    middleName: "степанівна"
};

const validResults = {
    nominative: {
        lastName: "зелена",
        firstName: "анна",
        middleName: "степанівна"
    },
    genitive: {
        lastName: "зеленої",
        firstName: "анни",
        middleName: "степанівни"
    },
    dative: {
        lastName: "зеленій",
        firstName: "анні",
        middleName: "степанівні"
    },
    accusative: {
        lastName: "зелену",
        firstName: "анну",
        middleName: "степанівну"
    },
    ablative: {
        lastName: "зеленою",
        firstName: "анною",
        middleName: "степанівною"
    },
    locative: {
        lastName: "зеленій",
        firstName: "анні",
        middleName: "степанівні"
    },
    vocative: {
        lastName: "зелена",
        firstName: "анно",
        middleName: "степанівно"
    }
};

testInflections(person, validResults);
