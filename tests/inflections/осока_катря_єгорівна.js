const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "осока",
    firstName: "катря",
    middleName: "єгорівна"
};

const validResults = {
    nominative: {
        lastName: "осока",
        firstName: "катря",
        middleName: "єгорівна"
    },
    genitive: {
        lastName: "осоки",
        firstName: "катрі",
        middleName: "єгорівни"
    },
    dative: {
        lastName: "осоці",
        firstName: "катрі",
        middleName: "єгорівні"
    },
    accusative: {
        lastName: "осоку",
        firstName: "катрю",
        middleName: "єгорівну"
    },
    ablative: {
        lastName: "осокою",
        firstName: "катрею",
        middleName: "єгорівною"
    },
    locative: {
        lastName: "осоці",
        firstName: "катрі",
        middleName: "єгорівні"
    },
    vocative: {
        lastName: "осоко",
        firstName: "катрю",
        middleName: "єгорівно"
    }
};

testInflections(person, validResults);
