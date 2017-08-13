const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "батіг",
    firstName: "милан",
    middleName: "никифорович"
};

const validResults = {
    nominative: {
        lastName: "батіг",
        firstName: "милан",
        middleName: "никифорович"
    },
    genitive: {
        lastName: "батога",
        firstName: "милана",
        middleName: "никифоровича"
    },
    dative: {
        lastName: "батогу",
        firstName: "милану",
        middleName: "никифоровичу"
    },
    accusative: {
        lastName: "батога",
        firstName: "милана",
        middleName: "никифоровича"
    },
    ablative: {
        lastName: "батогом",
        firstName: "миланом",
        middleName: "никифоровичем"
    },
    locative: {
        lastName: "батозі",
        firstName: "миланові",
        middleName: "никифоровичу"
    },
    vocative: {
        lastName: "батогу",
        firstName: "милане",
        middleName: "никифоровичу"
    }
};

testInflections(person, validResults);
