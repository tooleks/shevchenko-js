const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "стрелкіна",
    firstName: "одарка",
    middleName: "тарасівна"
};

const validResults = {
    nominative: {
        lastName: "стрелкіна",
        firstName: "одарка",
        middleName: "тарасівна"
    },
    genitive: {
        lastName: "стрелкіної",
        firstName: "одарки",
        middleName: "тарасівни"
    },
    dative: {
        lastName: "стрелкіній",
        firstName: "одарці",
        middleName: "тарасівні"
    },
    accusative: {
        lastName: "стрелкіну",
        firstName: "одарку",
        middleName: "тарасівну"
    },
    ablative: {
        lastName: "стрелкіною",
        firstName: "одаркою",
        middleName: "тарасівною"
    },
    locative: {
        lastName: "стрелкіній",
        firstName: "одарці",
        middleName: "тарасівні"
    },
    vocative: {
        lastName: "стрелкіна",
        firstName: "одарко",
        middleName: "тарасівно"
    }
};

testInflections(person, validResults);
