const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "притула",
    firstName: "квітка",
    middleName: "євгенівна"
};

const validResults = {
    nominative: {
        lastName: "притула",
        firstName: "квітка",
        middleName: "євгенівна"
    },
    genitive: {
        lastName: "притули",
        firstName: "квітки",
        middleName: "євгенівни"
    },
    dative: {
        lastName: "притулі",
        firstName: "квітці",
        middleName: "євгенівні"
    },
    accusative: {
        lastName: "притулу",
        firstName: "квітку",
        middleName: "євгенівну"
    },
    ablative: {
        lastName: "притулою",
        firstName: "квіткою",
        middleName: "євгенівною"
    },
    locative: {
        lastName: "притулі",
        firstName: "квітці",
        middleName: "євгенівні"
    },
    vocative: {
        lastName: "притуло",
        firstName: "квітко",
        middleName: "євгенівно"
    }
};

testInflections(person, validResults);
