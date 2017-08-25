const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "кобилянська",
    firstName: "ольга",
    middleName: "юліанівна"
};

const validResults = {
    nominative: {
        lastName: "кобилянська",
        firstName: "ольга",
        middleName: "юліанівна"
    },
    genitive: {
        lastName: "кобилянської",
        firstName: "ольги",
        middleName: "юліанівни"
    },
    dative: {
        lastName: "кобилянській",
        firstName: "ользі",
        middleName: "юліанівні"
    },
    accusative: {
        lastName: "кобилянську",
        firstName: "ольгу",
        middleName: "юліанівну"
    },
    ablative: {
        lastName: "кобилянською",
        firstName: "ольгою",
        middleName: "юліанівною"
    },
    locative: {
        lastName: "кобилянській",
        firstName: "ользі",
        middleName: "юліанівні"
    },
    vocative: {
        lastName: "кобилянська",
        firstName: "ольго",
        middleName: "юліанівно"
    }
};

testInflections(person, validResults);
