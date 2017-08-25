const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "косач-квітка",
    firstName: "лариса",
    middleName: "петрівна"
};

const validResults = {
    nominative: {
        lastName: "косач-квітка",
        firstName: "лариса",
        middleName: "петрівна"
    },
    genitive: {
        lastName: "косач-квітки",
        firstName: "лариси",
        middleName: "петрівни"
    },
    dative: {
        lastName: "косач-квітці",
        firstName: "ларисі",
        middleName: "петрівні"
    },
    accusative: {
        lastName: "косач-квітку",
        firstName: "ларису",
        middleName: "петрівну"
    },
    ablative: {
        lastName: "косач-квіткою",
        firstName: "ларисою",
        middleName: "петрівною"
    },
    locative: {
        lastName: "косач-квітці",
        firstName: "ларисі",
        middleName: "петрівні"
    },
    vocative: {
        lastName: "косач-квітко",
        firstName: "ларисо",
        middleName: "петрівно"
    }
};

testInflections(person, validResults);
