const assert = require("assert");
const testInflections = require("../helpers").testInflections;

const person = {
    gender: "male",
    lastName: "вітер",
    firstName: "нагдибіда",
    middleName: "орестович"
};

const validResults = {
    nominative: {
        lastName: "вітер",
        firstName: "нагдибіда",
        middleName: "орестович"
    },
    genitive: {
        lastName: "вітра",
        firstName: "нагдибіди",
        middleName: "орестовича"
    },
    dative: {
        lastName: "вітру",
        firstName: "нагдибіді",
        middleName: "орестовичу"
    },
    accusative: {
        lastName: "вітра",
        firstName: "нагдибіду",
        middleName: "орестовича"
    },
    ablative: {
        lastName: "вітром",
        firstName: "нагдибідою",
        middleName: "орестовичем"
    },
    locative: {
        lastName: "вітрові",
        firstName: "нагдибіді",
        middleName: "орестовичу"
    },
    vocative: {
        lastName: "вітре",
        firstName: "нагдибідо",
        middleName: "орестовичу"
    }
};

testInflections(person, validResults);
