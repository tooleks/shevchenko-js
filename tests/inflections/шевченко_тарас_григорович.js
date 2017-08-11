const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "шевченко",
    firstName: "тарас",
    middleName: "григорович"
};

const validResults = {
    nominative: {
        lastName: "шевченко",
        firstName: "тарас",
        middleName: "григорович"
    },
    genitive: {
        lastName: "шевченка",
        firstName: "тараса",
        middleName: "григоровича"
    },
    dative: {
        lastName: "шевченку",
        firstName: "тарасу",
        middleName: "григоровичу"
    },
    accusative: {
        lastName: "шевченка",
        firstName: "тараса",
        middleName: "григоровича"
    },
    ablative: {
        lastName: "шевченком",
        firstName: "тарасом",
        middleName: "григоровичем"
    },
    locative: {
        lastName: "шевченкові",
        firstName: "тарасові",
        middleName: "григоровичу"
    },
    vocative: {
        lastName: "шевченку",
        firstName: "тарасе",
        middleName: "григоровичу"
    }
};

testInflections(person, validResults);
