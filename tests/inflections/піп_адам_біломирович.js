const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "піп",
    firstName: "адам",
    middleName: "біломирович"
};

const validResults = {
    nominative: {
        lastName: "піп",
        firstName: "адам",
        middleName: "біломирович"
    },
    genitive: {
        lastName: "попа",
        firstName: "адама",
        middleName: "біломировича"
    },
    dative: {
        lastName: "попу",
        firstName: "адаму",
        middleName: "біломировичу"
    },
    accusative: {
        lastName: "попа",
        firstName: "адама",
        middleName: "біломировича"
    },
    ablative: {
        lastName: "попом",
        firstName: "адамом",
        middleName: "біломировичем"
    },
    locative: {
        lastName: "попі",
        firstName: "адамові",
        middleName: "біломировичу"
    },
    vocative: {
        lastName: "попе",
        firstName: "адаме",
        middleName: "біломировичу"
    }
};

testInflections(person, validResults);
