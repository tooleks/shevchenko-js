const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "хоробра",
    firstName: "олеся",
    middleName: "сколівна"
};

const validResults = {
    nominative: {
        lastName: "хоробра",
        firstName: "олеся",
        middleName: "сколівна"
    },
    genitive: {
        lastName: "хороброї",
        firstName: "олесі",
        middleName: "сколівни"
    },
    dative: {
        lastName: "хоробрій",
        firstName: "олесі",
        middleName: "сколівні"
    },
    accusative: {
        lastName: "хоробру",
        firstName: "олесю",
        middleName: "сколівну"
    },
    ablative: {
        lastName: "хороброю",
        firstName: "олесею",
        middleName: "сколівною"
    },
    locative: {
        lastName: "хоробрій",
        firstName: "олесі",
        middleName: "сколівні"
    },
    vocative: {
        lastName: "хоробра",
        firstName: "олесю",
        middleName: "сколівно"
    }
};

testInflections(person, validResults);
