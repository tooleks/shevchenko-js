const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "розкіш",
    firstName: "богдан",
    middleName: "васильович"
};

const validResults = {
    nominative: {
        lastName: "розкіш",
        firstName: "богдан",
        middleName: "васильович"
    },
    genitive: {
        lastName: "розкоша",
        firstName: "богдана",
        middleName: "васильовича"
    },
    dative: {
        lastName: "розкошеві",
        firstName: "богдану",
        middleName: "васильовичу"
    },
    accusative: {
        lastName: "розкоша",
        firstName: "богдана",
        middleName: "васильовича"
    },
    ablative: {
        lastName: "розкошем",
        firstName: "богданом",
        middleName: "васильовичем"
    },
    locative: {
        lastName: "розкошеві",
        firstName: "богданові",
        middleName: "васильовичу"
    },
    vocative: {
        lastName: "розкоше",
        firstName: "богдане",
        middleName: "васильовичу"
    }
};

testInflections(person, validResults);
