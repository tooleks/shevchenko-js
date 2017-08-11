const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "старуха",
    firstName: "олег",
    middleName: "павлович"
};

const validResults = {
    nominative: {
        lastName: "старуха",
        firstName: "олег",
        middleName: "павлович"
    },
    genitive: {
        lastName: "старухи",
        firstName: "олега",
        middleName: "павловича"
    },
    dative: {
        lastName: "старусі",
        firstName: "олегу",
        middleName: "павловичу"
    },
    accusative: {
        lastName: "старуху",
        firstName: "олега",
        middleName: "павловича"
    },
    ablative: {
        lastName: "старухою",
        firstName: "олегом",
        middleName: "павловичем"
    },
    locative: {
        lastName: "старусі",
        firstName: "олегові",
        middleName: "павловичу"
    },
    vocative: {
        lastName: "старухо",
        firstName: "олегу",
        middleName: "павловичу"
    }
};

testInflections(person, validResults);
