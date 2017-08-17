const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "куліш",
    firstName: "сеон",
    middleName: "дірович"
};

const validResults = {
    nominative: {
        lastName: "куліш",
        firstName: "сеон",
        middleName: "дірович"
    },
    genitive: {
        lastName: "куліша",
        firstName: "сеона",
        middleName: "діровича"
    },
    dative: {
        lastName: "кулішу",
        firstName: "сеону",
        middleName: "діровичу"
    },
    accusative: {
        lastName: "куліша",
        firstName: "сеона",
        middleName: "діровича"
    },
    ablative: {
        lastName: "кулішем",
        firstName: "сеоном",
        middleName: "діровичем"
    },
    locative: {
        lastName: "кулішеві",
        firstName: "сеонові",
        middleName: "діровичу"
    },
    vocative: {
        lastName: "куліше",
        firstName: "сеоне",
        middleName: "діровичу"
    }
};

testInflections(person, validResults);
