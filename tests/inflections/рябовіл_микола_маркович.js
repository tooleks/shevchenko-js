const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "рябовіл",
    firstName: "микола",
    middleName: "маркович"
};

const validResults = {
    nominative: {
        lastName: "рябовіл",
        firstName: "микола",
        middleName: "маркович"
    },
    genitive: {
        lastName: "рябовола",
        firstName: "миколи",
        middleName: "марковича"
    },
    dative: {
        lastName: "рябоволу",
        firstName: "миколі",
        middleName: "марковичу"
    },
    accusative: {
        lastName: "рябовола",
        firstName: "миколу",
        middleName: "марковича"
    },
    ablative: {
        lastName: "рябоволом",
        firstName: "миколою",
        middleName: "марковичем"
    },
    locative: {
        lastName: "рябоволі",
        firstName: "миколі",
        middleName: "марковичу"
    },
    vocative: {
        lastName: "рябоволе",
        firstName: "миколо",
        middleName: "марковичу"
    }
};

testInflections(person, validResults);
