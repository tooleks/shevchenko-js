const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "сава",
    firstName: "лана",
    middleName: "либідівна"
};

const validResults = {
    nominative: {
        lastName: "сава",
        firstName: "лана",
        middleName: "либідівна"
    },
    genitive: {
        lastName: "сави",
        firstName: "лани",
        middleName: "либідівни"
    },
    dative: {
        lastName: "саві",
        firstName: "лані",
        middleName: "либідівні"
    },
    accusative: {
        lastName: "саву",
        firstName: "лану",
        middleName: "либідівну"
    },
    ablative: {
        lastName: "савою",
        firstName: "ланою",
        middleName: "либідівною"
    },
    locative: {
        lastName: "саві",
        firstName: "лані",
        middleName: "либідівні"
    },
    vocative: {
        lastName: "саво",
        firstName: "лано",
        middleName: "либідівно"
    }
};

testInflections(person, validResults);
