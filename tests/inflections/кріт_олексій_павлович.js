const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "кріт",
    firstName: "олексій",
    middleName: "павлович"
};

const validResults = {
    nominative: {
        lastName: "кріт",
        firstName: "олексій",
        middleName: "павлович"
    },
    genitive: {
        lastName: "крота",
        firstName: "олексія",
        middleName: "павловича"
    },
    dative: {
        lastName: "кроту",
        firstName: "олексію",
        middleName: "павловичу"
    },
    accusative: {
        lastName: "крота",
        firstName: "олексія",
        middleName: "павловича"
    },
    ablative: {
        lastName: "кротом",
        firstName: "олексієм",
        middleName: "павловичем"
    },
    locative: {
        lastName: "кроті",
        firstName: "олексієві",
        middleName: "павловичу"
    },
    vocative: {
        lastName: "кроте",
        firstName: "олексію",
        middleName: "павловичу"
    }
};

testInflections(person, validResults);
