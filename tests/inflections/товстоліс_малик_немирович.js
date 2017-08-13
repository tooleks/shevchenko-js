const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "товстоліс",
    firstName: "малик",
    middleName: "немирович"
};

const validResults = {
    nominative: {
        lastName: "товстоліс",
        firstName: "малик",
        middleName: "немирович"
    },
    genitive: {
        lastName: "товстоліса",
        firstName: "малика",
        middleName: "немировича"
    },
    dative: {
        lastName: "товстолісу",
        firstName: "малику",
        middleName: "немировичу"
    },
    accusative: {
        lastName: "товстоліса",
        firstName: "малика",
        middleName: "немировича"
    },
    ablative: {
        lastName: "товстолісом",
        firstName: "маликом",
        middleName: "немировичем"
    },
    locative: {
        lastName: "товстолісові",
        firstName: "маликові",
        middleName: "немировичу"
    },
    vocative: {
        lastName: "товстолісе",
        firstName: "малику",
        middleName: "немировичу"
    }
};

testInflections(person, validResults);
