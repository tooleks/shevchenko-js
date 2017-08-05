var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection куліш сеон дірович", function () {

    var person = {
        gender: "male",
        lastName: "куліш",
        firstName: "сеон",
        middleName: "дірович"
    };

    var validResults = {
        nominative: {
            lastName: "куліш",
            firstName: "сеон",
            middleName: "дірович"
        },
        genitive: {
            lastName: "куліша",
            firstName: "сеона",
            middleName: "діровича"
        },
        dative: {
            lastName: "кулішу",
            firstName: "сеону",
            middleName: "діровичу"
        },
        accusative: {
            lastName: "куліша",
            firstName: "сеона",
            middleName: "діровича"
        },
        ablative: {
            lastName: "кулішем",
            firstName: "сеоном",
            middleName: "діровичем"
        },
        locative: {
            lastName: "кулішеві",
            firstName: "сеонові",
            middleName: "діровичу"
        },
        vocative: {
            lastName: "куліше",
            firstName: "сеоне",
            middleName: "діровичу"
        }
    };

    testInflections(person, validResults);

});
