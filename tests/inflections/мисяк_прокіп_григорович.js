const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "мисяк",
    firstName: "прокіп",
    middleName: "григорович"
};

const validResults = {
    nominative: {
        lastName: "мисяк",
        firstName: "прокіп",
        middleName: "григорович"
    },
    genitive: {
        lastName: "мисяка",
        firstName: "прокопа",
        middleName: "григоровича"
    },
    dative: {
        lastName: "мисяку",
        firstName: "прокопу",
        middleName: "григоровичу"
    },
    accusative: {
        lastName: "мисяка",
        firstName: "прокопа",
        middleName: "григоровича"
    },
    ablative: {
        lastName: "мисяком",
        firstName: "прокопом",
        middleName: "григоровичем"
    },
    locative: {
        lastName: "мисякові",
        firstName: "прокопі",
        middleName: "григоровичу"
    },
    vocative: {
        lastName: "мисяку",
        firstName: "прокопе",
        middleName: "григоровичу"
    }
};

testInflections(person, validResults);
