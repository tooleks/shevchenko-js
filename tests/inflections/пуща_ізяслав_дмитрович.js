const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "пуща",
    firstName: "ізяслав",
    middleName: "дмитрович"
};

const validResults = {
    nominative: {
        lastName: "пуща",
        firstName: "ізяслав",
        middleName: "дмитрович"
    },
    genitive: {
        lastName: "пущі",
        firstName: "ізяслава",
        middleName: "дмитровича"
    },
    dative: {
        lastName: "пущі",
        firstName: "ізяславу",
        middleName: "дмитровичу"
    },
    accusative: {
        lastName: "пущу",
        firstName: "ізяслава",
        middleName: "дмитровича"
    },
    ablative: {
        lastName: "пущею",
        firstName: "ізяславом",
        middleName: "дмитровичем"
    },
    locative: {
        lastName: "пущі",
        firstName: "ізяславові",
        middleName: "дмитровичу"
    },
    vocative: {
        lastName: "пущо",
        firstName: "ізяславе",
        middleName: "дмитровичу"
    }
};

testInflections(person, validResults);
