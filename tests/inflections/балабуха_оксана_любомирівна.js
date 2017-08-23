const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "балабуха",
    firstName: "оксана",
    middleName: "любомирівна"
};

const validResults = {
    nominative: {
        lastName: "балабуха",
        firstName: "оксана",
        middleName: "любомирівна"
    },
    genitive: {
        lastName: "балабухи",
        firstName: "оксани",
        middleName: "любомирівни"
    },
    dative: {
        lastName: "балабусі",
        firstName: "оксані",
        middleName: "любомирівні"
    },
    accusative: {
        lastName: "балабуху",
        firstName: "оксану",
        middleName: "любомирівну"
    },
    ablative: {
        lastName: "балабухою",
        firstName: "оксаною",
        middleName: "любомирівною"
    },
    locative: {
        lastName: "балабусі",
        firstName: "оксані",
        middleName: "любомирівні"
    },
    vocative: {
        lastName: "балабухо",
        firstName: "оксано",
        middleName: "любомирівно"
    }
};

testInflections(person, validResults);
