const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "куліш",
    firstName: "пантелеймон",
    middleName: "олександрович"
};

const validResults = {
    nominative: {
        lastName: "куліш",
        firstName: "пантелеймон",
        middleName: "олександрович"
    },
    genitive: {
        lastName: "куліша",
        firstName: "пантелеймона",
        middleName: "олександровича"
    },
    dative: {
        lastName: "кулішу",
        firstName: "пантелеймону",
        middleName: "олександровичу"
    },
    accusative: {
        lastName: "куліша",
        firstName: "пантелеймона",
        middleName: "олександровича"
    },
    ablative: {
        lastName: "кулішем",
        firstName: "пантелеймоном",
        middleName: "олександровичем"
    },
    locative: {
        lastName: "кулішеві",
        firstName: "пантелеймонові",
        middleName: "олександровичу"
    },
    vocative: {
        lastName: "куліше",
        firstName: "пантелеймоне",
        middleName: "олександровичу"
    }
};

testInflections(person, validResults);
