const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "сковорода",
    firstName: "григорій",
    middleName: "савич"
};

const validResults = {
    nominative: {
        lastName: "сковорода",
        firstName: "григорій",
        middleName: "савич"
    },
    genitive: {
        lastName: "сковороди",
        firstName: "григорія",
        middleName: "савича"
    },
    dative: {
        lastName: "сковороді",
        firstName: "григорію",
        middleName: "савичу"
    },
    accusative: {
        lastName: "сковороду",
        firstName: "григорія",
        middleName: "савича"
    },
    ablative: {
        lastName: "сковородою",
        firstName: "григорієм",
        middleName: "савичем"
    },
    locative: {
        lastName: "сковороді",
        firstName: "григорієві",
        middleName: "савичу"
    },
    vocative: {
        lastName: "сковородо",
        firstName: "григорію",
        middleName: "савичу"
    }
};

testInflections(person, validResults);
