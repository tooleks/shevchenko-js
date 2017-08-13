const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "верес",
    firstName: "воля",
    middleName: "всеславович"
};

const validResults = {
    nominative: {
        lastName: "верес",
        firstName: "воля",
        middleName: "всеславович"
    },
    genitive: {
        lastName: "вереса",
        firstName: "волі",
        middleName: "всеславовича"
    },
    dative: {
        lastName: "вересу",
        firstName: "волі",
        middleName: "всеславовичу"
    },
    accusative: {
        lastName: "вереса",
        firstName: "волю",
        middleName: "всеславовича"
    },
    ablative: {
        lastName: "вересом",
        firstName: "волею",
        middleName: "всеславовичем"
    },
    locative: {
        lastName: "вересові",
        firstName: "волі",
        middleName: "всеславовичу"
    },
    vocative: {
        lastName: "вересу",
        firstName: "воле",
        middleName: "всеславовичу"
    }
};

testInflections(person, validResults);
