var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection шевченко анна юріївна", function () {

    var person = {
        gender: "female",
        lastName: "шевченко",
        firstName: "анна",
        middleName: "юріївна"
    };

    var validResults = {
        nominative: {
            lastName: "шевченко",
            firstName: "анна",
            middleName: "юріївна"
        },
        genitive: {
            lastName: "шевченко",
            firstName: "анни",
            middleName: "юріївни"
        },
        dative: {
            lastName: "шевченко",
            firstName: "анні",
            middleName: "юріївні"
        },
        accusative: {
            lastName: "шевченко",
            firstName: "анну",
            middleName: "юріївну"
        },
        ablative: {
            lastName: "шевченко",
            firstName: "анною",
            middleName: "юріївною"
        },
        locative: {
            lastName: "шевченко",
            firstName: "анні",
            middleName: "юріївні"
        },
        vocative: {
            lastName: "шевченко",
            firstName: "анно",
            middleName: "юріївно"
        }
    };

    testInflections(person, validResults);

});
