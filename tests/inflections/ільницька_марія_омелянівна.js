const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "female",
    lastName: "ільницька",
    firstName: "марія",
    middleName: "омелянівна"
};

const validResults = {
    nominative: {
        lastName: "ільницька",
        firstName: "марія",
        middleName: "омелянівна"
    },
    genitive: {
        lastName: "ільницької",
        firstName: "марії",
        middleName: "омелянівни"
    },
    dative: {
        lastName: "ільницькій",
        firstName: "марії",
        middleName: "омелянівні"
    },
    accusative: {
        lastName: "ільницьку",
        firstName: "марію",
        middleName: "омелянівну"
    },
    ablative: {
        lastName: "ільницькою",
        firstName: "марією",
        middleName: "омелянівною"
    },
    locative: {
        lastName: "ільницькій",
        firstName: "марії",
        middleName: "омелянівні"
    },
    vocative: {
        lastName: "ільницька",
        firstName: "маріє",
        middleName: "омелянівно"
    }
};

testInflections(person, validResults);
