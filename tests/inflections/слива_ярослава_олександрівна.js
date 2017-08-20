const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "слива",
    firstName: "ярослава",
    middleName: "олександрівна"
};

const validResults = {
    nominative: {
        lastName: "слива",
        firstName: "ярослава",
        middleName: "олександрівна"
    },
    genitive: {
        lastName: "сливи",
        firstName: "ярослави",
        middleName: "олександрівни"
    },
    dative: {
        lastName: "сливі",
        firstName: "ярославі",
        middleName: "олександрівні"
    },
    accusative: {
        lastName: "сливу",
        firstName: "ярославу",
        middleName: "олександрівну"
    },
    ablative: {
        lastName: "сливою",
        firstName: "ярославою",
        middleName: "олександрівною"
    },
    locative: {
        lastName: "сливі",
        firstName: "ярославі",
        middleName: "олександрівні"
    },
    vocative: {
        lastName: "сливо",
        firstName: "ярославо",
        middleName: "олександрівно"
    }
};

testInflections(person, validResults);
