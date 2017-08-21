const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "спокійна",
    firstName: "анжела",
    middleName: "вадимівна"
};

const validResults = {
    nominative: {
        lastName: "спокійна",
        firstName: "анжела",
        middleName: "вадимівна"
    },
    genitive: {
        lastName: "спокійної",
        firstName: "анжели",
        middleName: "вадимівни"
    },
    dative: {
        lastName: "спокійній",
        firstName: "анжелі",
        middleName: "вадимівні"
    },
    accusative: {
        lastName: "спокійну",
        firstName: "анжелу",
        middleName: "вадимівну"
    },
    ablative: {
        lastName: "спокійною",
        firstName: "анжелою",
        middleName: "вадимівною"
    },
    locative: {
        lastName: "спокійній",
        firstName: "анжелі",
        middleName: "вадимівні"
    },
    vocative: {
        lastName: "спокійна",
        firstName: "анжело",
        middleName: "вадимівно"
    }
};

testInflections(person, validResults);
