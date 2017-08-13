const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "узвіз",
    firstName: "вір",
    middleName: "вітанович"
};

const validResults = {
    nominative: {
        lastName: "узвіз",
        firstName: "вір",
        middleName: "вітанович"
    },
    genitive: {
        lastName: "узвоза",
        firstName: "віра",
        middleName: "вітановича"
    },
    dative: {
        lastName: "узвозу",
        firstName: "віру",
        middleName: "вітановичу"
    },
    accusative: {
        lastName: "узвоза",
        firstName: "віра",
        middleName: "вітановича"
    },
    ablative: {
        lastName: "узвозом",
        firstName: "віром",
        middleName: "вітановичем"
    },
    locative: {
        lastName: "узвозі",
        firstName: "вірові",
        middleName: "вітановичу"
    },
    vocative: {
        lastName: "узвозе",
        firstName: "віре",
        middleName: "вітановичу"
    }
};

testInflections(person, validResults);
