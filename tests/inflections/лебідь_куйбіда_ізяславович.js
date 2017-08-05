var assert = require("assert");
var testInflections = require("../helpers").testInflections;

describe("inflection лебідь куйбіда ізяславович", function () {

    var person = {
        gender: "male",
        lastName: "лебідь",
        firstName: "куйбіда",
        middleName: "ізяславович"
    };

    var validResults = {
        nominative: {
            lastName: "лебідь",
            firstName: "куйбіда",
            middleName: "ізяславович"
        },
        genitive: {
            lastName: "лебедя",
            firstName: "куйбіди",
            middleName: "ізяславовича"
        },
        dative: {
            lastName: "лебедю",
            firstName: "куйбіді",
            middleName: "ізяславовичу"
        },
        accusative: {
            lastName: "лебедя",
            firstName: "куйбіду",
            middleName: "ізяславовича"
        },
        ablative: {
            lastName: "лебедем",
            firstName: "куйбідою",
            middleName: "ізяславовичем"
        },
        locative: {
            lastName: "лебедю",
            firstName: "куйбіді",
            middleName: "ізяславовичу"
        },
        vocative: {
            lastName: "лебедю",
            firstName: "куйбідо",
            middleName: "ізяславовичу"
        }
    };

    testInflections(person, validResults);

});
