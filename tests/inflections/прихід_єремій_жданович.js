const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "прихід",
    firstName: "єремій",
    middleName: "жданович"
};

const validResults = {
    nominative: {
        lastName: "прихід",
        firstName: "єремій",
        middleName: "жданович"
    },
    genitive: {
        lastName: "прихода",
        firstName: "єремія",
        middleName: "ждановича"
    },
    dative: {
        lastName: "приходу",
        firstName: "єремію",
        middleName: "ждановичу"
    },
    accusative: {
        lastName: "прихода",
        firstName: "єремія",
        middleName: "ждановича"
    },
    ablative: {
        lastName: "приходом",
        firstName: "єремієм",
        middleName: "ждановичем"
    },
    locative: {
        lastName: "приході",
        firstName: "єремієві",
        middleName: "ждановичу"
    },
    vocative: {
        lastName: "приходе",
        firstName: "єремію",
        middleName: "ждановичу"
    }
};

testInflections(person, validResults);
