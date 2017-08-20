const testInflections = require("../helpers/test-inflections");

const person = {
    gender: "female",
    lastName: "корова",
    firstName: "анна",
    middleName: "григорівна"
};

const validResults = {
    nominative: {
        lastName: "корова",
        firstName: "анна",
        middleName: "григорівна"
    },
    genitive: {
        lastName: "корови",
        firstName: "анни",
        middleName: "григорівни"
    },
    dative: {
        lastName: "корові",
        firstName: "анні",
        middleName: "григорівні"
    },
    accusative: {
        lastName: "корову",
        firstName: "анну",
        middleName: "григорівну"
    },
    ablative: {
        lastName: "коровою",
        firstName: "анною",
        middleName: "григорівною"
    },
    locative: {
        lastName: "корові",
        firstName: "анні",
        middleName: "григорівні"
    },
    vocative: {
        lastName: "корово",
        firstName: "анно",
        middleName: "григорівно"
    }
};

testInflections(person, validResults);
