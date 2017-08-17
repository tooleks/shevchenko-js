const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "грець",
    firstName: "джордж",
    middleName: "ігорович"
};

const validResults = {
    nominative: {
        lastName: "грець",
        firstName: "джордж",
        middleName: "ігорович"
    },
    genitive: {
        lastName: "греця",
        firstName: "джорджа",
        middleName: "ігоровича"
    },
    dative: {
        lastName: "грецю",
        firstName: "джорджу",
        middleName: "ігоровичу"
    },
    accusative: {
        lastName: "греця",
        firstName: "джорджа",
        middleName: "ігоровича"
    },
    ablative: {
        lastName: "грецем",
        firstName: "джорджем",
        middleName: "ігоровичем"
    },
    locative: {
        lastName: "грецю",
        firstName: "джорджеві",
        middleName: "ігоровичу"
    },
    vocative: {
        lastName: "грецю",
        firstName: "джордже",
        middleName: "ігоровичу"
    }
};

testInflections(person, validResults);
