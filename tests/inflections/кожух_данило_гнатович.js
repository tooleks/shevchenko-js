const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "кожух",
    firstName: "данило",
    middleName: "гнатович"
};

const validResults = {
    nominative: {
        lastName: "кожух",
        firstName: "данило",
        middleName: "гнатович"
    },
    genitive: {
        lastName: "кожуха",
        firstName: "данила",
        middleName: "гнатовича"
    },
    dative: {
        lastName: "кожуху",
        firstName: "данилу",
        middleName: "гнатовичу"
    },
    accusative: {
        lastName: "кожуха",
        firstName: "данила",
        middleName: "гнатовича"
    },
    ablative: {
        lastName: "кожухом",
        firstName: "данилом",
        middleName: "гнатовичем"
    },
    locative: {
        lastName: "кожухові",
        firstName: "данилові",
        middleName: "гнатовичу"
    },
    vocative: {
        lastName: "кожуху",
        firstName: "даниле",
        middleName: "гнатовичу"
    }
};

testInflections(person, validResults);
