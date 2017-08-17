const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "гмиря",
    firstName: "соломія",
    middleName: "василівна"
};

const validResults = {
    nominative: {
        lastName: "гмиря",
        firstName: "соломія",
        middleName: "василівна"
    },
    genitive: {
        lastName: "гмирі",
        firstName: "соломії",
        middleName: "василівни"
    },
    dative: {
        lastName: "гмирі",
        firstName: "соломії",
        middleName: "василівні"
    },
    accusative: {
        lastName: "гмирю",
        firstName: "соломію",
        middleName: "василівну"
    },
    ablative: {
        lastName: "гмирею",
        firstName: "соломією",
        middleName: "василівною"
    },
    locative: {
        lastName: "гмирі",
        firstName: "соломії",
        middleName: "василівні"
    },
    vocative: {
        lastName: "гмире",
        firstName: "соломіє",
        middleName: "василівно"
    }
};

testInflections(person, validResults);
