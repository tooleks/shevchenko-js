const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "гарькава",
    firstName: "нінель",
    middleName: "руданівна"
};

const validResults = {
    nominative: {
        lastName: "гарькава",
        firstName: "нінель",
        middleName: "руданівна"
    },
    genitive: {
        lastName: "гарькавої",
        firstName: "нінелі",
        middleName: "руданівни"
    },
    dative: {
        lastName: "гарькавій",
        firstName: "нінелі",
        middleName: "руданівні"
    },
    accusative: {
        lastName: "гарькаву",
        firstName: "нінель",
        middleName: "руданівну"
    },
    ablative: {
        lastName: "гарькавою",
        firstName: "нінеллю",
        middleName: "руданівною"
    },
    locative: {
        lastName: "гарькавій",
        firstName: "нінелі",
        middleName: "руданівні"
    },
    vocative: {
        lastName: "гарькава",
        firstName: "нінель",
        middleName: "руданівно"
    }
};

testInflections(person, validResults);
