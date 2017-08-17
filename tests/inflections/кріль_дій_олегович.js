const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "кріль",
    firstName: "дій",
    middleName: "олегович"
};

const validResults = {
    nominative: {
        lastName: "кріль",
        firstName: "дій",
        middleName: "олегович"
    },
    genitive: {
        lastName: "кроля",
        firstName: "дія",
        middleName: "олеговича"
    },
    dative: {
        lastName: "кролю",
        firstName: "дію",
        middleName: "олеговичу"
    },
    accusative: {
        lastName: "кроля",
        firstName: "дія",
        middleName: "олеговича"
    },
    ablative: {
        lastName: "кролем",
        firstName: "дієм",
        middleName: "олеговичем"
    },
    locative: {
        lastName: "кролю",
        firstName: "дієві",
        middleName: "олеговичу"
    },
    vocative: {
        lastName: "кролю",
        firstName: "дію",
        middleName: "олеговичу"
    }
};

testInflections(person, validResults);
