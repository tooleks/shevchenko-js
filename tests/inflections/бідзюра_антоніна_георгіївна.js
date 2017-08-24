const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "бідзюра",
    firstName: "антоніна",
    middleName: "георгіївна"
};

const validResults = {
    nominative: {
        lastName: "бідзюра",
        firstName: "антоніна",
        middleName: "георгіївна"
    },
    genitive: {
        lastName: "бідзюри",
        firstName: "антоніни",
        middleName: "георгіївни"
    },
    dative: {
        lastName: "бідзюрі",
        firstName: "антоніні",
        middleName: "георгіївні"
    },
    accusative: {
        lastName: "бідзюру",
        firstName: "антоніну",
        middleName: "георгіївну"
    },
    ablative: {
        lastName: "бідзюрою",
        firstName: "антоніною",
        middleName: "георгіївною"
    },
    locative: {
        lastName: "бідзюрі",
        firstName: "антоніні",
        middleName: "георгіївні"
    },
    vocative: {
        lastName: "бідзюро",
        firstName: "антоніно",
        middleName: "георгіївно"
    }
};

testInflections(person, validResults);
