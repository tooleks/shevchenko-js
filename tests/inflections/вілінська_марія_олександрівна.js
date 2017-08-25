const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "вілінська",
    firstName: "марія",
    middleName: "олександрівна"
};

const validResults = {
    nominative: {
        lastName: "вілінська",
        firstName: "марія",
        middleName: "олександрівна"
    },
    genitive: {
        lastName: "вілінської",
        firstName: "марії",
        middleName: "олександрівни"
    },
    dative: {
        lastName: "вілінській",
        firstName: "марії",
        middleName: "олександрівні"
    },
    accusative: {
        lastName: "вілінську",
        firstName: "марію",
        middleName: "олександрівну"
    },
    ablative: {
        lastName: "вілінською",
        firstName: "марією",
        middleName: "олександрівною"
    },
    locative: {
        lastName: "вілінській",
        firstName: "марії",
        middleName: "олександрівні"
    },
    vocative: {
        lastName: "вілінська",
        firstName: "маріє",
        middleName: "олександрівно"
    }
};

testInflections(person, validResults);
