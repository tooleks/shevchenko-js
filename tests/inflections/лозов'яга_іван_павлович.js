const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "лозов'яга",
    firstName: "іван",
    middleName: "павлович"
};

const validResults = {
    nominative: {
        lastName: "лозов'яга",
        firstName: "іван",
        middleName: "павлович"
    },
    genitive: {
        lastName: "лозов'яги",
        firstName: "івана",
        middleName: "павловича"
    },
    dative: {
        lastName: "лозов'язі",
        firstName: "івану",
        middleName: "павловичу"
    },
    accusative: {
        lastName: "лозов'ягу",
        firstName: "івана",
        middleName: "павловича"
    },
    ablative: {
        lastName: "лозов'ягою",
        firstName: "іваном",
        middleName: "павловичем"
    },
    locative: {
        lastName: "лозов'язі",
        firstName: "іванові",
        middleName: "павловичу"
    },
    vocative: {
        lastName: "лозов'яго",
        firstName: "іване",
        middleName: "павловичу"
    }
};

testInflections(person, validResults);
