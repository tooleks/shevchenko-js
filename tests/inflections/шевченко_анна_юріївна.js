const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "female",
    lastName: "шевченко",
    firstName: "анна",
    middleName: "юріївна"
};

const validResults = {
    nominative: {
        lastName: "шевченко",
        firstName: "анна",
        middleName: "юріївна"
    },
    genitive: {
        lastName: "шевченко",
        firstName: "анни",
        middleName: "юріївни"
    },
    dative: {
        lastName: "шевченко",
        firstName: "анні",
        middleName: "юріївні"
    },
    accusative: {
        lastName: "шевченко",
        firstName: "анну",
        middleName: "юріївну"
    },
    ablative: {
        lastName: "шевченко",
        firstName: "анною",
        middleName: "юріївною"
    },
    locative: {
        lastName: "шевченко",
        firstName: "анні",
        middleName: "юріївні"
    },
    vocative: {
        lastName: "шевченко",
        firstName: "анно",
        middleName: "юріївно"
    }
};

testInflections(person, validResults);
