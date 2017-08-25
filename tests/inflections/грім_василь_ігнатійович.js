const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "грім",
    firstName: "василь",
    middleName: "ігнатійович"
};

const validResults = {
    nominative: {
        lastName: "грім",
        firstName: "василь",
        middleName: "ігнатійович"
    },
    genitive: {
        lastName: "грома",
        firstName: "василя",
        middleName: "ігнатійовича"
    },
    dative: {
        lastName: "грому",
        firstName: "василю",
        middleName: "ігнатійовичу"
    },
    accusative: {
        lastName: "грома",
        firstName: "василя",
        middleName: "ігнатійовича"
    },
    ablative: {
        lastName: "громом",
        firstName: "василем",
        middleName: "ігнатійовичем"
    },
    locative: {
        lastName: "громі",
        firstName: "василеві",
        middleName: "ігнатійовичу"
    },
    vocative: {
        lastName: "громе",
        firstName: "василю",
        middleName: "ігнатійовичу"
    }
};

testInflections(person, validResults);
