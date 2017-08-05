var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection заєць павло вікторович", function () {

    var person = {
        gender: "male",
        lastName: "заєць",
        firstName: "павло",
        middleName: "вікторович"
    };

    var validResults = {
        nominative: {
            lastName: "заєць",
            firstName: "павло",
            middleName: "вікторович"
        },
        genitive: {
            lastName: "зайця",
            firstName: "павла",
            middleName: "вікторовича"
        },
        dative: {
            lastName: "зайцю",
            firstName: "павлу",
            middleName: "вікторовичу"
        },
        accusative: {
            lastName: "зайця",
            firstName: "павла",
            middleName: "вікторовича"
        },
        ablative: {
            lastName: "зайцем",
            firstName: "павлом",
            middleName: "вікторовичем"
        },
        locative: {
            lastName: "зайцю",
            firstName: "павлові",
            middleName: "вікторовичу"
        },
        vocative: {
            lastName: "зайцю",
            firstName: "павле",
            middleName: "вікторовичу"
        }
    };

    testInflections(person, validResults);

});
