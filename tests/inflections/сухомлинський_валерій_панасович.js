var assert = require("assert");
var testInflections = require("../helpers").testInflections;

var person = {
    gender: "male",
    lastName: "сухомлинський",
    firstName: "валерій",
    middleName: "панасович"
};

var validResults = {
    nominative: {
        lastName: "сухомлинський",
        firstName: "валерій",
        middleName: "панасович"
    },
    genitive: {
        lastName: "сухомлинського",
        firstName: "валерія",
        middleName: "панасовича"
    },
    dative: {
        lastName: "сухомлинському",
        firstName: "валерію",
        middleName: "панасовичу"
    },
    accusative: {
        lastName: "сухомлинського",
        firstName: "валерія",
        middleName: "панасовича"
    },
    ablative: {
        lastName: "сухомлинським",
        firstName: "валерієм",
        middleName: "панасовичем"
    },
    locative: {
        lastName: "сухомлинському",
        firstName: "валерієві",
        middleName: "панасовичу"
    },
    vocative: {
        lastName: "сухомлинський",
        firstName: "валерію",
        middleName: "панасовичу"
    }
};

testInflections(person, validResults);
