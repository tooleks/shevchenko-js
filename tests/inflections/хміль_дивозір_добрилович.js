const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "хміль",
    firstName: "дивозір",
    middleName: "добрилович"
};

const validResults = {
    nominative: {
        lastName: "хміль",
        firstName: "дивозір",
        middleName: "добрилович"
    },
    genitive: {
        lastName: "хмеля",
        firstName: "дивозора",
        middleName: "добриловича"
    },
    dative: {
        lastName: "хмелю",
        firstName: "дивозору",
        middleName: "добриловичу"
    },
    accusative: {
        lastName: "хмеля",
        firstName: "дивозора",
        middleName: "добриловича"
    },
    ablative: {
        lastName: "хмелем",
        firstName: "дивозором",
        middleName: "добриловичем"
    },
    locative: {
        lastName: "хмелю",
        firstName: "дивозорі",
        middleName: "добриловичу"
    },
    vocative: {
        lastName: "хмеле",
        firstName: "дивозоре",
        middleName: "добриловичу"
    }
};

testInflections(person, validResults);
