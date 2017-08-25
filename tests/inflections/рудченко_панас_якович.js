const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "male",
    lastName: "рудченко",
    firstName: "панас",
    middleName: "якович"
};

const validResults = {
    nominative: {
        lastName: "рудченко",
        firstName: "панас",
        middleName: "якович"
    },
    genitive: {
        lastName: "рудченка",
        firstName: "панаса",
        middleName: "яковича"
    },
    dative: {
        lastName: "рудченку",
        firstName: "панасу",
        middleName: "яковичу"
    },
    accusative: {
        lastName: "рудченка",
        firstName: "панаса",
        middleName: "яковича"
    },
    ablative: {
        lastName: "рудченком",
        firstName: "панасом",
        middleName: "яковичем"
    },
    locative: {
        lastName: "рудченкові",
        firstName: "панасові",
        middleName: "яковичу"
    },
    vocative: {
        lastName: "рудченку",
        firstName: "панасе",
        middleName: "яковичу"
    }
};

testInflections(person, validResults);
