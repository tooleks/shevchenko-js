const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "забіяка",
    firstName: "антоніна",
    middleName: "вікторівна"
};

const validResults = {
    nominative: {
        lastName: "забіяка",
        firstName: "антоніна",
        middleName: "вікторівна"
    },
    genitive: {
        lastName: "забіяки",
        firstName: "антоніни",
        middleName: "вікторівни"
    },
    dative: {
        lastName: "забіяці",
        firstName: "антоніні",
        middleName: "вікторівні"
    },
    accusative: {
        lastName: "забіяку",
        firstName: "антоніну",
        middleName: "вікторівну"
    },
    ablative: {
        lastName: "забіякою",
        firstName: "антоніною",
        middleName: "вікторівною"
    },
    locative: {
        lastName: "забіяці",
        firstName: "антоніні",
        middleName: "вікторівні"
    },
    vocative: {
        lastName: "забіяко",
        firstName: "антоніно",
        middleName: "вікторівно"
    }
};

testInflections(person, validResults);
