const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "бехта",
    firstName: "мальвіна",
    middleName: "антонівна"
};

const validResults = {
    nominative: {
        lastName: "бехта",
        firstName: "мальвіна",
        middleName: "антонівна"
    },
    genitive: {
        lastName: "бехти",
        firstName: "мальвіни",
        middleName: "антонівни"
    },
    dative: {
        lastName: "бехті",
        firstName: "мальвіні",
        middleName: "антонівні"
    },
    accusative: {
        lastName: "бехту",
        firstName: "мальвіну",
        middleName: "антонівну"
    },
    ablative: {
        lastName: "бехтою",
        firstName: "мальвіною",
        middleName: "антонівною"
    },
    locative: {
        lastName: "бехті",
        firstName: "мальвіні",
        middleName: "антонівні"
    },
    vocative: {
        lastName: "бехто",
        firstName: "мальвіно",
        middleName: "антонівно"
    }
};

testInflections(person, validResults);
