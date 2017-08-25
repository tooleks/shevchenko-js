const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "коцюбинський",
    firstName: "михайло",
    middleName: "михайлович"
};

const validResults = {
    nominative: {
        lastName: "коцюбинський",
        firstName: "михайло",
        middleName: "михайлович"
    },
    genitive: {
        lastName: "коцюбинського",
        firstName: "михайла",
        middleName: "михайловича"
    },
    dative: {
        lastName: "коцюбинському",
        firstName: "михайлу",
        middleName: "михайловичу"
    },
    accusative: {
        lastName: "коцюбинського",
        firstName: "михайла",
        middleName: "михайловича"
    },
    ablative: {
        lastName: "коцюбинським",
        firstName: "михайлом",
        middleName: "михайловичем"
    },
    locative: {
        lastName: "коцюбинському",
        firstName: "михайлові",
        middleName: "михайловичу"
    },
    vocative: {
        lastName: "коцюбинський",
        firstName: "михайле",
        middleName: "михайловичу"
    }
};

testInflections(person, validResults);
