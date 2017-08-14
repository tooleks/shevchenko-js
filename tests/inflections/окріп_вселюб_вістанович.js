const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "окріп",
    firstName: "вселюб",
    middleName: "вістанович"
};

const validResults = {
    nominative: {
        lastName: "окріп",
        firstName: "вселюб",
        middleName: "вістанович"
    },
    genitive: {
        lastName: "окропа",
        firstName: "вселюба",
        middleName: "вістановича"
    },
    dative: {
        lastName: "окропу",
        firstName: "вселюбу",
        middleName: "вістановичу"
    },
    accusative: {
        lastName: "окропа",
        firstName: "вселюба",
        middleName: "вістановича"
    },
    ablative: {
        lastName: "окропом",
        firstName: "вселюбом",
        middleName: "вістановичем"
    },
    locative: {
        lastName: "окропі",
        firstName: "вселюбові",
        middleName: "вістановичу"
    },
    vocative: {
        lastName: "окропе",
        firstName: "вселюбе",
        middleName: "вістановичу"
    }
};

testInflections(person, validResults);
