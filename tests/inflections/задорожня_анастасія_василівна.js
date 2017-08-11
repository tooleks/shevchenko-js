const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "female",
    lastName: "задорожня",
    firstName: "анастасія",
    middleName: "василівна"
};

const validResults = {
    nominative: {
        lastName: "задорожня",
        firstName: "анастасія",
        middleName: "василівна"
    },
    genitive: {
        lastName: "задорожньої",
        firstName: "анастасії",
        middleName: "василівни"
    },
    dative: {
        lastName: "задорожній",
        firstName: "анастасії",
        middleName: "василівні"
    },
    accusative: {
        lastName: "задорожню",
        firstName: "анастасію",
        middleName: "василівну"
    },
    ablative: {
        lastName: "задорожньою",
        firstName: "анастасією",
        middleName: "василівною"
    },
    locative: {
        lastName: "задорожній",
        firstName: "анастасії",
        middleName: "василівні"
    },
    vocative: {
        lastName: "задорожня",
        firstName: "анастасіє",
        middleName: "василівно"
    }
};

testInflections(person, validResults);
