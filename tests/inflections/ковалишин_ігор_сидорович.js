const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "ковалишин",
    firstName: "ігор",
    middleName: "сидорович"
};

const validResults = {
    nominative: {
        lastName: "ковалишин",
        firstName: "ігор",
        middleName: "сидорович"
    },
    genitive: {
        lastName: "ковалишина",
        firstName: "ігоря",
        middleName: "сидоровича"
    },
    dative: {
        lastName: "ковалишину",
        firstName: "ігорю",
        middleName: "сидоровичу"
    },
    accusative: {
        lastName: "ковалишина",
        firstName: "ігоря",
        middleName: "сидоровича"
    },
    ablative: {
        lastName: "ковалишиним",
        firstName: "ігорем",
        middleName: "сидоровичем"
    },
    locative: {
        lastName: "ковалишину",
        firstName: "ігорю",
        middleName: "сидоровичу"
    },
    vocative: {
        lastName: "ковалишине",
        firstName: "ігорю",
        middleName: "сидоровичу"
    }
};

testInflections(person, validResults);
