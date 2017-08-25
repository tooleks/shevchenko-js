const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "косач",
    firstName: "ольга",
    middleName: "петрівна"
};

const validResults = {
    nominative: {
        lastName: "косач",
        firstName: "ольга",
        middleName: "петрівна"
    },
    genitive: {
        lastName: "косач",
        firstName: "ольги",
        middleName: "петрівни"
    },
    dative: {
        lastName: "косач",
        firstName: "ользі",
        middleName: "петрівні"
    },
    accusative: {
        lastName: "косач",
        firstName: "ольгу",
        middleName: "петрівну"
    },
    ablative: {
        lastName: "косач",
        firstName: "ольгою",
        middleName: "петрівною"
    },
    locative: {
        lastName: "косач",
        firstName: "ользі",
        middleName: "петрівні"
    },
    vocative: {
        lastName: "косач",
        firstName: "ольго",
        middleName: "петрівно"
    }
};

testInflections(person, validResults);
