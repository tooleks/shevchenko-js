const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "риндич",
    firstName: "федір",
    middleName: "йосипович"
};

const validResults = {
    nominative: {
        lastName: "риндич",
        firstName: "федір",
        middleName: "йосипович"
    },
    genitive: {
        lastName: "риндича",
        firstName: "федора",
        middleName: "йосиповича"
    },
    dative: {
        lastName: "риндичу",
        firstName: "федору",
        middleName: "йосиповичу"
    },
    accusative: {
        lastName: "риндича",
        firstName: "федора",
        middleName: "йосиповича"
    },
    ablative: {
        lastName: "риндичем",
        firstName: "федором",
        middleName: "йосиповичем"
    },
    locative: {
        lastName: "риндичу",
        firstName: "федорові",
        middleName: "йосиповичу"
    },
    vocative: {
        lastName: "риндичу",
        firstName: "федоре",
        middleName: "йосиповичу"
    }
};

testInflections(person, validResults);
