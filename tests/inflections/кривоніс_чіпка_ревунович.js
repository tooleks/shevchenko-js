const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "кривоніс",
    firstName: "чіпка",
    middleName: "ревунович"
};

const validResults = {
    nominative: {
        lastName: "кривоніс",
        firstName: "чіпка",
        middleName: "ревунович"
    },
    genitive: {
        lastName: "кривоноса",
        firstName: "чіпки",
        middleName: "ревуновича"
    },
    dative: {
        lastName: "кривоносу",
        firstName: "чіпці",
        middleName: "ревуновичу"
    },
    accusative: {
        lastName: "кривоноса",
        firstName: "чіпку",
        middleName: "ревуновича"
    },
    ablative: {
        lastName: "кривоносом",
        firstName: "чіпкою",
        middleName: "ревуновичем"
    },
    locative: {
        lastName: "кривоносі",
        firstName: "чіпці",
        middleName: "ревуновичу"
    },
    vocative: {
        lastName: "кривоносе",
        firstName: "чіпко",
        middleName: "ревуновичу"
    }
};

testInflections(person, validResults);
