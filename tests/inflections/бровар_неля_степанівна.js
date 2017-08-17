const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "бровар",
    firstName: "неля",
    middleName: "степанівна"
};

const validResults = {
    nominative: {
        lastName: "бровар",
        firstName: "неля",
        middleName: "степанівна"
    },
    genitive: {
        lastName: "бровар",
        firstName: "нелі",
        middleName: "степанівни"
    },
    dative: {
        lastName: "бровар",
        firstName: "нелі",
        middleName: "степанівні"
    },
    accusative: {
        lastName: "бровар",
        firstName: "нелю",
        middleName: "степанівну"
    },
    ablative: {
        lastName: "бровар",
        firstName: "нелею",
        middleName: "степанівною"
    },
    locative: {
        lastName: "бровар",
        firstName: "нелі",
        middleName: "степанівні"
    },
    vocative: {
        lastName: "бровар",
        firstName: "нелю",
        middleName: "степанівно"
    }
};

testInflections(person, validResults);
