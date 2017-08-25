const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "котляревський",
    firstName: "іван",
    middleName: "петрович"
};

const validResults = {
    nominative: {
        lastName: "котляревський",
        firstName: "іван",
        middleName: "петрович"
    },
    genitive: {
        lastName: "котляревського",
        firstName: "івана",
        middleName: "петровича"
    },
    dative: {
        lastName: "котляревському",
        firstName: "івану",
        middleName: "петровичу"
    },
    accusative: {
        lastName: "котляревського",
        firstName: "івана",
        middleName: "петровича"
    },
    ablative: {
        lastName: "котляревським",
        firstName: "іваном",
        middleName: "петровичем"
    },
    locative: {
        lastName: "котляревському",
        firstName: "іванові",
        middleName: "петровичу"
    },
    vocative: {
        lastName: "котляревський",
        firstName: "іване",
        middleName: "петровичу"
    }
};

testInflections(person, validResults);
