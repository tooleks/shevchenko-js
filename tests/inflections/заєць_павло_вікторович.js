const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "заєць",
    firstName: "павло",
    middleName: "вікторович"
};

const validResults = {
    nominative: {
        lastName: "заєць",
        firstName: "павло",
        middleName: "вікторович"
    },
    genitive: {
        lastName: "зайця",
        firstName: "павла",
        middleName: "вікторовича"
    },
    dative: {
        lastName: "зайцю",
        firstName: "павлу",
        middleName: "вікторовичу"
    },
    accusative: {
        lastName: "зайця",
        firstName: "павла",
        middleName: "вікторовича"
    },
    ablative: {
        lastName: "зайцем",
        firstName: "павлом",
        middleName: "вікторовичем"
    },
    locative: {
        lastName: "зайцю",
        firstName: "павлові",
        middleName: "вікторовичу"
    },
    vocative: {
        lastName: "зайцю",
        firstName: "павле",
        middleName: "вікторовичу"
    }
};

testInflections(person, validResults);
