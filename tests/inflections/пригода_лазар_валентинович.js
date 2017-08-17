const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "пригода",
    firstName: "лазар",
    middleName: "валентинович"
};

const validResults = {
    nominative: {
        lastName: "пригода",
        firstName: "лазар",
        middleName: "валентинович"
    },
    genitive: {
        lastName: "пригоди",
        firstName: "лазаря",
        middleName: "валентиновича"
    },
    dative: {
        lastName: "пригоді",
        firstName: "лазарю",
        middleName: "валентиновичу"
    },
    accusative: {
        lastName: "пригоду",
        firstName: "лазаря",
        middleName: "валентиновича"
    },
    ablative: {
        lastName: "пригодою",
        firstName: "лазарем",
        middleName: "валентиновичем"
    },
    locative: {
        lastName: "пригоді",
        firstName: "лазарю",
        middleName: "валентиновичу"
    },
    vocative: {
        lastName: "пригодо",
        firstName: "лазарю",
        middleName: "валентиновичу"
    }
};

testInflections(person, validResults);
