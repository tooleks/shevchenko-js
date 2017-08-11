const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "нечуй-левицький",
    firstName: "іван",
    middleName: "семенович"
};

const validResults = {
    nominative: {
        lastName: "нечуй-левицький",
        firstName: "іван",
        middleName: "семенович"
    },
    genitive: {
        lastName: "нечуя-левицького",
        firstName: "івана",
        middleName: "семеновича"
    },
    dative: {
        lastName: "нечую-левицькому",
        firstName: "івану",
        middleName: "семеновичу"
    },
    accusative: {
        lastName: "нечуя-левицького",
        firstName: "івана",
        middleName: "семеновича"
    },
    ablative: {
        lastName: "нечуєм-левицьким",
        firstName: "іваном",
        middleName: "семеновичем"
    },
    locative: {
        lastName: "нечуєві-левицькому",
        firstName: "іванові",
        middleName: "семеновичу"
    },
    vocative: {
        lastName: "нечую-левицький",
        firstName: "іване",
        middleName: "семеновичу"
    }
};

testInflections(person, validResults);
